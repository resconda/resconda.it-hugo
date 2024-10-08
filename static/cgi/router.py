from mod_python import apache
from contact import form_contact

from search import search, search_categories, search_classes, search_tags

URIs = [
    ("/cgi/form_contact", form_contact),
    ("/cgi/search", search),
    ("/cgi/search/categories", search_categories),
    ("/cgi/search/classes", search_classes),
    ("/cgi/search/tags", search_tags),
]


def handler(req):
    request_uri = req.uri
    for uriitem in URIs:
        uri = uriitem[0]
        urihandler = uriitem[1]
        if uri == request_uri:
            req.log_error("Path %s has a valid handler %s" %
                          (uri, str(urihandler)), apache.APLOG_DEBUG)
            return urihandler(req)
            # return form_contact(req)
    req.log_error("Invalid path %s" % request_uri, apache.APLOG_ERR)
    return apache.HTTP_BAD_REQUEST
