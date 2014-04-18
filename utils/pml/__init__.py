import re

def link2txt(title, link):
    return title


def source2txt(title, link):
    return title


def person2txt(text, name):
    return text


def citation2txt(text):
    return "«" + text + "»"


class TagHandler(object):
    def __init__(self, regex_src, handle):
        self.regex = re.compile(regex_src)
        self.handle = handle

    def transform(self, s):
        return self.regex.sub(self.handle, s)


class Translator(object):
    def __init__(self,
                 link=link2txt,
                 source=source2txt,
                 person=person2txt,
                 citation=citation2txt):
        """
        Setups PML translator.
        Takes functions link(title, link), source(title, link),
        person(text, name), citation(text) that return text to
        substitute the appropriate PML commands.
        Default values for functions are the convertors to plain text.
        """
        self.handlers = [TagHandler(r"\*посилання\s+([^*]*)\s+([^*\s]+)\*",
                                    lambda m: link(m.group(1),
                                                   m.group(2))),
                         TagHandler(r"\*джерело\s+([^*]*)\s+([^*\s]+)\*",
                                    lambda m: source(m.group(1),
                                                     m.group(2))),
                         TagHandler(r"\*персона\s+([^*]*)\s+([^*\s]+)\*",
                                    lambda m: person(m.group(1),
                                                     m.group(2))),
                         TagHandler(r"\*цитата\s+([^*]*)\*",
                                    lambda m: citation(m.group(1)))]

    def translate(self, s):
        """ Takes PML string in s. Returns translated string. """ 
        for h in self.handlers:
            s = h.transform(s)
        return s
