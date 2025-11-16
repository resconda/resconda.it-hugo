import xml.etree.ElementTree as ET
import csv
import sys
import argparse
import html


def parse_sitemap_to_csv(sitemap: str, output: str, base: str):
    """
    Parse sitemap XML and extract articles to CSV
    
    Args:
        sitemap: Path to sitemap XML file
        output: Path to output CSV file
    """
    try:
        # Parse XML
        tree = ET.parse(sitemap)
        root = tree.getroot()
        
        # Define namespace (important for XML parsing)
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        articles = []
        
        # Find all <url> elements
        for url in root.findall('ns:url', namespace):
            # Get location
            loc = url.find('ns:loc', namespace)
            if loc is None:
                continue
            
            loc_text = loc.text.strip() if loc.text else ''
            
            # Filter only articles (loc starts with /articles)
            if not loc_text.startswith('/articles'):
                continue
            
            # Extract other fields
            date = url.find('ns:date', namespace)
            title = url.find('ns:title', namespace)
            description = url.find('ns:description', namespace)
            tags = url.find('ns:tags', namespace)
            class_elem = url.find('ns:class', namespace)
            
            article = {
                'url': f"{base}{loc_text}",
                'date': date.text if date is not None and date.text else '',
                'title': title.text if title is not None and title.text else '',
                'description': html.unescape(description.text).replace('\n', ' ') if description is not None and description.text else '',
                'tags': tags.text if tags is not None and tags.text else '',
                'class': class_elem.text if class_elem is not None and class_elem.text else ''
            }
            
            articles.append(article)
        
        # Write to CSV
        if articles:
            fieldnames = ['url', 'date', 'title', 'description', 'tags', 'class']
            
            with open(output, 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(articles)
            
            print(f"✓ Successfully extracted {len(articles)} articles to {output}")
        else:
            print("⚠ No articles found in sitemap")
        
        return articles
        
    except ET.ParseError as e:
        print(f"✗ XML parsing error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Error: {e}")
        sys.exit(1)


def parse_sitemap_string(xml_string: str, output_csv: str = 'articles.csv'):
    """
    Parse sitemap from XML string instead of file
    
    Args:
        xml_string: XML content as string
        output_csv: Path to output CSV file
    """
    try:
        root = ET.fromstring(xml_string)
        
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        articles = []
        
        for url in root.findall('ns:url', namespace):
            loc = url.find('ns:loc', namespace)
            if loc is None:
                continue
            
            loc_text = loc.text.strip() if loc.text else ''
            
            if not loc_text.startswith('/articles'):
                continue
            
            date = url.find('ns:date', namespace)
            title = url.find('ns:title', namespace)
            description = url.find('ns:description', namespace)
            tags = url.find('ns:tags', namespace)
            class_elem = url.find('ns:class', namespace)
            
            article = {
                'loc': loc_text,
                'date': date.text if date is not None and date.text else '',
                'title': title.text if title is not None and title.text else '',
                'description': description.text.replace('\\n', ' ') if description is not None and description.text else '',
                'tags': tags.text if tags is not None and tags.text else '',
                'class': class_elem.text if class_elem is not None and class_elem.text else ''
            }
            
            articles.append(article)
        
        if articles:
            fieldnames = ['loc', 'date', 'title', 'description', 'tags', 'class']
            
            with open(output_csv, 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(articles)
            
            print(f"✓ Successfully extracted {len(articles)} articles to {output_csv}")
        else:
            print("⚠ No articles found in sitemap")
        
        return articles
        
    except ET.ParseError as e:
        print(f"✗ XML parsing error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("xml_file", help="Path to sitemap.xml file")
    parser.add_argument("--output", help="Path to output CSV file", default='articles.csv')
    parser.add_argument("--base-url", help="Base URL of the website", default='https://www.resconda.it')
    
    args = parser.parse_args()
    parse_sitemap_to_csv(sitemap=args.xml_file, output=args.output, base=args.base_url)


    # Alternative: Quick test with your example
    # xml_example = '''<?xml version= "1.0" encoding= "utf-8" standalone= "yes"?>
    # <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    #     xmlns:xhtml="http://www.w3.org/1999/xhtml">
    #     <url>
    #         <loc>/articles/spuntini/la-posizione-di-resconda-in-vista-della-conferenza-nazionale-per-lo-sviluppo-sostenibile/</loc>
    #         <date>2025-11-08T00:00:00+00:00</date>
    #         <title>La posizione di Resconda in vista della Conferenza Nazionale per lo Sviluppo Sostenibile</title>
    #         <description>Il 2-3-4 dicembre 2025 a Roma si terrà la Conferenza Nazionale per lo Sviluppo Sostenibile 2025. Resconda fa parte del Gruppo di Lavoro Cultura del Forum Sviluppo Sostenibile - Ministero dell’Ambiente e della Sicurezza Energetica - MASE, incaricato di redigere un <em>Position paper</em> sui tre “vettori di sviluppo” individuati dal MASE: “Cultura”, “Partecipazione”, “Coerenza”.</description>
    #         <tags>spuntini</tags>
    #     </url>
    # </urlset>'''

    # parse_sitemap_string(xml_example, 'test_output.csv')