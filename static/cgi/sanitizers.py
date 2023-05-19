import re

class SanitiserException(Exception):
    pass


def sanitize_email(input) -> str:
    tostr = sanitize_string(input)
    email_reg = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    if re.match(email_reg, tostr):
        return tostr
    else:
        raise SanitiserException("Invalid email: %s" % tostr)


def sanitize_bool(input) -> bool:
    if type(input) is bool:
        return input
    elif type(input) is int:
        return input != 0
    elif type(input) is str:
        return input != "0" and input != "false"
    else:
        raise SanitiserException("Invalid bool value %s" % str(input))


def sanitize_string(input) -> str:
    if type(input) is bytes:
        return input.decode()
    elif type(input) is str:
        return input
    else:
        raise SanitiserException("Invalid input, string expected but %s found" % type(input))
