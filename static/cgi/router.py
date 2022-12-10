from mod_python import apache
from form_contact import form_contact

URIs = [
    ("/cgi/form_contact.py", form_contact),
]

def handler(req):
    request_uri = req.uri
    for uriitem in URIs:
        uri = uriitem[0]
        urihandler = uriitem[1]
        if uri == request_uri:
            req.log_error("Path has a valid handler %s" % str(urihandler))
            # return urihandler(req)
            return form_contact(req)
    req.log_error("Invalid path %s" % request_uri)
    return apache.HTTP_BAD_REQUEST
