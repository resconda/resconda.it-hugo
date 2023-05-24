import sqlite3
from mod_python import apache
import os

SCRIPT_PATH = os.path.dirname(__file__)
DB_PATH = os.path.join(SCRIPT_PATH, "res", "test.db")
GENERIC_QUERY_TEMPLATE = '''
SELECT id, category, title, summary, date, image_caption FROM db_contents WHERE 
draft = 0
AND ( 0
    OR category LIKE :category
    OR title LIKE :title
    OR summary LIKE :sumamry
    OR image_caption LIKE :caption
    )
'''

def _make_generic_query(term: str):
    con = sqlite3.connect(DB_PATH)
    cur = con.execute(GENERIC_QUERY_TEMPLATE, {
        "category": f"%{term}%",
        "title": f"%{term}%",
        "summary": f"%{term}%",
        "caption": f"%{term}%",
    })
    

    
def search(req):
    rawdata = req.read().decode()
    req.log_error(rawdata,  apache.APLOG_DEBUG)
    # parse_qs yields a dict whose values are all lists of values,
    # so that multiple occurrences of a parameter are handled
    # hence we must always handle lists, even when only one value is expected
    rawparams = ups.parse_qs(rawdata)
    req.log_error("Parsed params: %s" % str(rawparams), apache.APLOG_DEBUG)