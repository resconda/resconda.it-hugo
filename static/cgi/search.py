import sqlite3
from mod_python import apache
import urllib.parse as ups
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
    OR summary LIKE :summary
    OR image_caption LIKE :caption
    )
'''
CATEGORIES_QUERY = '''\
SELECT id, category FROM categories WHERE
'''

def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}

def _dbcursor() -> sqlite3.Cursor:
    con = sqlite3.connect(DB_PATH)
    con.row_factory = dict_factory
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
    rawparams = ups.parse_qs(req.args)
    req.log_error("Parsed params: %s" % str(rawparams), apache.APLOG_DEBUG)
    term = rawparams.get('q', [""])
    rows = _make_generic_query(term[0])
    req.content_type = "application/json"
    req.write(jds({
        "term": term,
        "data": rows
    }))
    return apache.OK

""" 
GET /search/categories
"""
def search_categories(req):
    cursor = _dbcursor()
    results = []
    for row in cursor.execute("SELECT DISTINCT category FROM db_contents WHERE draft = 0"):
        results.append(row['category'])
    req.content_type = "application/json"
    req.write(jds({
        "data": results
    }))
    return apache.OK


""" 
GET /search/classes
"""
def search_classes(req):
    cursor = _dbcursor()
    results = []
    for row in cursor.execute("SELECT * FROM classes"):
        results.append(row)
    req.content_type = "application/json"
    req.write(jds({
        "data": results
    }))
    return apache.OK

""" 
GET /search/tags
"""
def search_tags(req):
    cursor = _dbcursor()
    results = []
    for row in cursor.execute("SELECT * FROM tags"):
        results.append(row)
    req.content_type = "application/json"
    req.write(jds({
        "data": results
    }))
    return apache.OK
    