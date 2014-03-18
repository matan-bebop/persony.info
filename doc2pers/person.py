from event import *

def read_name(f):
    par = concat_lines(read_paragraph(f), ' ').strip()
    pib = par.split()
    pib += [""]*(3 - len(pib))
    return pib


def read_brief(f):
    return concat_lines(read_paragraph(f), ' ').strip()


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
            ev = read_event(f, ev.start)

    def full_name(self):
        return (self.surname + ' ' 
                + self.firstname + ' ' 
                + self.middlename).strip()

    def name(self):
        return (self.firstname + ' ' + self.surname).strip()
