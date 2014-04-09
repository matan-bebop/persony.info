import re

from event import *

def remove_unknown_leading_symbol(s):
    """ 
    An unkonwn leading symbol occures while reading person name from the text 
    file exported by Google Docs. This routine leaves only the relevant name 
    string.
    """
    name = re.compile(r"[0-9a-zA-Zа-яА-Я]")
    return s[name.search(s).start():]


def read_name(f):
    par = remove_unknown_leading_symbol(read_paragraph(f).strip())
    pib = par.split()
    # Add empty surname and middlename if they were not specified
    pib += [""]*(3 - len(pib))
    return pib


def read_brief(f):
    return read_paragraph(f).strip()


class Person(object):
    def __init__(self):
        self.surname = None
        self.firstname = None
        self.middlename = None
        self.brief = None
        self.photo = None
        self.events = []


    def read_descrition(self, f):
        [self.surname, self.firstname, self.middlename] = read_name(f)
        self.brief = read_brief(f)
        self.photo = read_paragraph(f).strip()


    def read_events(self, f):
        ev = read_event(f)
        while ev is not None:
            self.events.append(ev)
            ev = read_event(f, ev)

    def full_name(self):
        return (self.surname + ' ' 
                + self.firstname + ' ' 
                + self.middlename).strip()

    def name(self):
        return (self.firstname + ' ' + self.surname).strip()
