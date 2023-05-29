import sqlite3
from mod_python import apache
import os
from json import dumps as jds

SCRIPT_PATH = os.path.dirname(__file__)
DB_PATH = os.path.join(SCRIPT_PATH, "res", "contents.sqlite")

GENERIC_QUERY_TEMPLATE = '''\
SELECT id, category, title, summary, date, image_caption FROM db_contents WHERE 
draft = 0
AND ( 0
    OR category LIKE :category
    OR title LIKE :title
    OR summary LIKE :sumamry
    OR image_caption LIKE :caption
    )
'''
CATEGORIES_QUERY = '''\
SELECT id, category FROM categories WHERE
'''

def _dbcursor() -> sqlite3.Cursor:
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    return cur

def _make_generic_query(term: str) -> list:
    cur = _dbcursor()
    ret = []
    
    for row in cur.execute(GENERIC_QUERY_TEMPLATE, {
        "category": f"%{term}%",
        "title": f"%{term}%",
        "summary": f"%{term}%",
        "caption": f"%{term}%",
    }):
        ret.append(row)
    return ret

    
""" 
GET /search?q={search_term}
"""
def search(req):
    rawdata = req.read().decode()
    req.log_error(rawdata,  apache.APLOG_DEBUG)
    # parse_qs yields a dict whose values are all lists of values,
    # so that multiple occurrences of a parameter are handled
    # hence we must always handle lists, even when only one value is expected
    rawparams = ups.parse_qs(rawdata)
    req.log_error("Parsed params: %s" % str(rawparams), apache.APLOG_DEBUG)
    term = rawparams['q']
    rows = _make_generic_query(term)
    req.write(jds({
        "term": term,
        "data": rows
    }))

""" 
GET /search/categories
"""
def search_categories(req):
    cursor = _dbcursor()
    results = []
    for row in cursor.execute("SELECT DISTINCT category FROM db_contents WHERE draft = 0"):
        results.append(row['category'])
    req.write({
        "data": results
    })


""" 
GET /search/classes
"""
def search_classes(req):
    cursor = _dbcursor()
    results = []
    for row in cursor.execute("SELECT * FROM classes"):
        results.append(row)
    req.write({
        "data": results
    })

""" 
GET /search/tags
"""
def search_tags(req):
    cursor = _dbcursor()
    results = []
    for row in cursor.execute("SELECT * FROM tags"):
        results.append(row)
    req.write({
        "data": results
    })