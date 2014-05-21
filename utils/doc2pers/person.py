import re

from event import *

def remove_unknown_leading_symbol(s):
    """ 
    An unkonwn leading symbol occures while reading person name from the text 
    file exported by Google Docs. This routine leaves only the relevant name 
    string.
    """
    name = re.compile(r"\w")
    return s[name.search(s).start():]


def read_name(f):
    return beautify(remove_unknown_leading_symbol(read_paragraph(f).strip()))


def read_brief(f):
    return beautify(read_paragraph(f).strip())


class Person(object):
    def __init__(self):
        self.name = None
        self.brief = None
        self.photo = None
        self.events = []

    def read_descrition(self, f):
        self.name = read_name(f)
        self.brief = read_brief(f)
        self.photo = read_paragraph(f).strip()

    def read_events(self, f):
        ev = read_event(f)
        while ev is not None:
            self.events.append(ev)
            ev = read_event(f, ev)
