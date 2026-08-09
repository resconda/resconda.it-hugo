import io
import re
import argparse
from sys import stdout
from datetime import datetime
from time import strftime
import logging
from os.path import dirname, join as pjoin, isdir, exists
from os import listdir
from json import load as jload

SCRIPT_PATH = dirname(__file__)

infonews_regex = re.compile(r'^ *# +(?:\*\*|__)?Info-news(?:\*\*|__)?', re.IGNORECASE|re.MULTILINE)
spuntini_regex = re.compile(r'^ *# +(?:\*\*|__)?SPUNTINI(?:\*\*|__)?', re.IGNORECASE|re.MULTILINE)
pillola_title_regex = re.compile(r'^\s*## *\d+ +(?P<title>.*)', re.IGNORECASE|re.MULTILINE)
pillola_class_regex = re.compile(r'^ *### CLASSE', re.IGNORECASE|re.MULTILINE)
pillola_tags_regex = re.compile(r'^ *### TAGS', re.IGNORECASE|re.MULTILINE)
pillola_cover_regex = re.compile(r'^ *### COVER', re.IGNORECASE|re.MULTILINE)
pillola_summary_regex = re.compile(r'^ *### SINTESI', re.IGNORECASE|re.MULTILINE)
pillola_body_regex = re.compile(r'^ *### TESTO', re.IGNORECASE|re.MULTILINE)
spuntini_title_regex = re.compile(r'^\s*## +(?P<title>.*)', re.IGNORECASE|re.MULTILINE)
spuntini_tags_regex = pillola_tags_regex
spuntini_cover_regex = pillola_cover_regex
spuntini_summary_regex = pillola_summary_regex
spuntini_body_regex = pillola_body_regex

# GDocs thinks '[!-]' are dangerous characters and escapes them when exporting to markdown. Hugo does not like escaped '\!' or similar in YAML headers, so we need to remove them
escaped_esclamation_regex = re.compile(r'\\!', re.MULTILINE)
escaped_dash_regex = re.compile(r'\\-', re.MULTILINE)
co2e_regex = re.compile(r'(\W)(CO2e?)(\W)')
meter_powers_regex = re.compile(r'm(\d+)')
b64_image_regex = re.compile(r'<data:image/.+;base64,.+>$')
internal_links_regex = re.compile(r'(https://)?(www\.)?resconda\.it/articles/')
bold_markers_merger = re.compile(r'(\*\*|__)\s*(\*\*|__)')

def slugify(s):
  s = s.lower().strip()
  s = re.sub(r'[^\w\s-]', '', s)
  s = re.sub(r'[\s_-]+', '-', s)
  s = re.sub(r'^-+|-+$', '', s)
  return s


def unescape_safe_characters(text: str) -> str:
    text = escaped_esclamation_regex.sub("!", text)
    text = escaped_dash_regex.sub("-", text)
    return text

class Article:
    _title: str
    publish_date: datetime
    _summary: str
    tags: list[str]
    _cover: str
    classes: list[str]
    _body: str
    raw_content: str

    def __init__(self, title: str, raw_content: str, publish_date: datetime):
        self._title = title
        self.raw_content = raw_content
        self.publish_date = publish_date
        self.classes = None
        self.tags = None
        self._cover = None
        self._body = None
        self._summary = None
        self.parse()

    def parse(self):
        pass

    @property
    def title(self):
        return self._title
    @title.setter
    def title(self, value):
        self._title = unescape_safe_characters(value)

    @property
    def summary(self):
        return self._summary
    @summary.setter
    def summary(self, value):
        self._summary = unescape_safe_characters(value)

    @property
    def cover(self):
        return self._cover
    @cover.setter
    def cover(self, value):
        self._cover = re.sub(r'\\', '', value)

    def __str__(self) -> str:
        return self.render()

    @property
    def body(self):
        return self._body
    @body.setter
    def body(self, value):
        self._body = co2e_regex.sub("\\1{{< \\2 >}}\\3", value)
        self._body = meter_powers_regex.sub("{{< sup>}}\\1{{</sup>}}", self._body)
        self._body = internal_links_regex.sub("/articles/", self._body)
        self._body = bold_markers_merger.sub("", self._body)
        self._body = unescape_safe_characters(self._body)

    
    def header_lines(self) -> list[str]:
        outlines = []
        if len(self.body) == 0:
            outlines.append('draft: true')
        outlines.append(f'title: "{self.title}"')
        outlines.append(f"date: {self.publish_date.strftime("%Y-%m-%d")}")
        outlines.append(f'tags:\n{"\n".join(self.tags)}')
        if self.summary:
            outlines.append(f'summary: |\n  {self.summary}')
        comment_prefix = ""
        if not self.cover:
            comment_prefix = "# "
        outlines.append(f"{comment_prefix}cover_image:")
        outlines.append(f"{comment_prefix} src: {self.cover}")
        outlines.append(f"# caption: ")
        if self.classes:
            outlines.append(f'classes:\n{"\n".join(self.classes)}')
        return outlines

    def render(self) -> str:
        header = "\n".join(self.header_lines())
        return f"""---
{header}
---

{self.body}
    """
    
    @property
    def slugified_title(self):
        return slugify(self.title)

class Spuntini(Article):
    def parse(self):
        raw_content = self.raw_content
        title = self.title
        publish_date = self.publish_date

        tags_match = spuntini_tags_regex.search(raw_content)
        cover_match = spuntini_cover_regex.search(raw_content)
        summary_match = spuntini_summary_regex.search(raw_content)
        body_match = spuntini_body_regex.search(raw_content)
        if not body_match:
            raise Exception(f"No body heading found in pillola block titled {title}")

        if tags_match:
            start = tags_match.end()
            if cover_match:
                end = cover_match.start()
            elif summary_match:
                end = summary_match.start()
            else:
                end = body_match.start()
            self.tags = ["- " + re.sub(r'^\s*[-\*]\s*', '', line) for line in raw_content[start:end].split("\n") if len(line.strip())>0]
        if cover_match:
            self.cover = raw_content[cover_match.end():summary_match.start()].strip()
        self.summary = "\n".join([line for line in raw_content[summary_match.end():body_match.start()].split("\n") if len(line.strip())>0]).strip()
        self.body = raw_content[body_match.end():].strip()

    def render(self) -> str:
        return super().render()
        
class Pillola(Article):
    
    def parse(self) -> str:
        raw_content = self.raw_content
        title = self.title

        tags_match = pillola_tags_regex.search(raw_content)
        if not tags_match:
            raise Exception(f"No tags heading found in pillola block titled {title}")
        cover_match = pillola_cover_regex.search(raw_content)
        class_match = pillola_class_regex.search(raw_content)
        if not class_match:
            raise Exception(f"No class heading found in pillola block titled {title}")
        summary_match = pillola_summary_regex.search(raw_content)
        if not summary_match:
            raise Exception(f"No summary heading found in pillola block titled {title}")
        body_match = pillola_body_regex.search(raw_content)
        if not body_match:
            raise Exception(f"No body heading found in pillola block titled {title}")

        self.classes = [f"- {line}" for line in raw_content[class_match.end():tags_match.start()].split("\n") if len(line.strip())>0]
        tags_end_boundary = summary_match.start() if not cover_match else cover_match.start()
        self.tags = ["- " + re.sub(r'^\s*[\*\-]\s*', '', line) for line in raw_content[tags_match.end():tags_end_boundary].split("\n") if len(line.strip())>0]
        if cover_match: 
            self.cover = raw_content[cover_match.end():summary_match.start()].strip()
        self.summary = "\n".join([line for line in raw_content[summary_match.end():body_match.start()].split("\n") if len(line.strip())>0])
        self.body = raw_content[body_match.end():].strip()

    def render(self) -> str:
        return super().render()


def parse_spuntini_block(spuntini_block: str, publish_date: datetime, cover_map: dict|None) -> Spuntini:
    title_match = spuntini_title_regex.search(spuntini_block)
    
    if not title_match:
        raise Exception("Could not find title heading in spuntini_block")
    title = title_match.group("title")
    spuntino = Spuntini(title=title, raw_content=spuntini_block, publish_date=publish_date)
    if cover_map:
        if spuntino.cover in cover_map:
            spuntino.cover = cover_map[spuntino.cover]
    return spuntino


def parse_pillole_block(pillole_block: str, publish_date: datetime, cover_map: dict|None) -> list[Pillola]:
    n_pills = 0
    matches = []
    pillole = []
    for title_match in pillola_title_regex.finditer(pillole_block):
        matches.append(title_match)
        logging.debug(f"Title #{len(matches)}: {title_match.group(1).strip()} [{title_match.start(), title_match.end()}]")
    n_pills = len(matches)
    if n_pills == 0:
        raise Exception("No heading found matching title regex")
    elif n_pills == 1: # strange but not impossible
        pillola = Pillola(title=title_match.group("title").strip(), raw_content=pillole_block[title_match.end():], publish_date=publish_date)
        pillole.append(pillola)
    else:
        left = n_pills
        for bidx, match in enumerate(matches):
            title = match.group("title").strip()
            if left > 1:
                raw_content = pillole_block[match.end():matches[bidx+1].start()]
            else:
                raw_content = pillole_block[match.end():]
            left -= 1
            pillola = Pillola(title=title, raw_content=raw_content, publish_date=publish_date)
            if cover_map:
                    if pillola.cover in cover_map:
                        pillola.cover = cover_map[pillola.cover]
            pillole.append(pillola)
    return pillole


def parse_mdfile_content(mdcontent:str, publish_date: datetime, outdir: str, cover_map: dict|None):
    # cut her head!
    infonews_match = infonews_regex.search(mdcontent)
    if not infonews_match:
        raise Exception("Could not find 'Info-news' heading")

    spuntini_match = spuntini_regex.search(mdcontent)
    if not spuntini_match:
        raise Exception("Could not find 'Spuntini' heading")

    start = infonews_match.end()
    end = spuntini_match.start()
    logging.debug(f"Pillole block slice: [{start}, {end}]")
    pillole_block = mdcontent[start:end]
    start = spuntini_match.start()
    logging.debug(f"Spuntini block slice: [{start},]")
    spuntini_block = mdcontent[start:]
    spuntino = parse_spuntini_block(spuntini_block=spuntini_block, publish_date=publish_date, cover_map=cover_map)
    with io.open(pjoin(outdir, "spuntini", f"{spuntino.slugified_title}.md"), "wt") as ofile:
        ofile.write(spuntino.render())

    # pillole
    pillole = parse_pillole_block(pillole_block=pillole_block, publish_date=publish_date, cover_map=cover_map)
    # debug
    logging.debug(f"{len(pillole)} pillole parsed")
    # for pill in pillole:
    #     print(str(pill))
    for pill in pillole:
        with io.open(pjoin(outdir, f"{pill.slugified_title}.md"), "wt") as ofile:
            ofile.write(pill.render())
    

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    
    parser = argparse.ArgumentParser()
    parser.add_argument("INPUT")
    parser.add_argument("--publish-date", help="Date to be set in pillole articles, in YYYY-MM-DD format", default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("-o", "--outdir", default=SCRIPT_PATH)

    arguments = parser.parse_args()

    if arguments.publish_date:
        publish_date = datetime.strptime(arguments.publish_date, "%Y-%m-%d")

    if isdir(arguments.INPUT):
        # find the .md file in the directory and use it as DOCX_EXPORTED_MD
        md_file = None
        for f in listdir(arguments.INPUT):
            if f.endswith(".md"):
                md_file = pjoin(arguments.INPUT, f)
                logging.info(f"Will parse {md_file}")
                break
        if md_file is None:
            raise Exception(f"No .md file found in {arguments.INPUT}")
        # get the cove map file
        cover_map_file_path = pjoin(arguments.INPUT, "d2c_map.json")
        if not exists(cover_map_file_path):
            raise Exception(f"No cover map file found in {arguments.INPUT}")
        logging.info(f"Will use cover map file {cover_map_file_path}")
        cover_map = jload(open(cover_map_file_path, "rt"))
    else:
        md_file = arguments.INPUT
        cover_map = None
    with io.open(md_file, "rt") as ifile:
        mdcontent = ifile.read()

        
    # try:
    parse_mdfile_content(mdcontent=mdcontent, publish_date=publish_date, outdir=arguments.outdir, cover_map=cover_map)
    # except Exception as ex:
    #     stdout.write(f"{str(ex)}\n")


