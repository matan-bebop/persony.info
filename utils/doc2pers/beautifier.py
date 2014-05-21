import re

replaces = {"---" : "—",
            "--[^-]" : "—",
            "<<" : "«",
            ">>" : "»",
            r'"([^"]*)"' : r"«\1»",
            "„" : "«",
            "”" : "»",
            "“" : "«",
            "\.\.\." : "…"}

inner = re.compile("«[^«»]*«")
end_inner = re.compile("»[^«»]*»")

def make_brackets_hierarchy(s):
    """ Replaces pairs of corner brackets inside other corner brackets to “” """

    inner_replaces = { r'«([^»]*)»' : r"“\1”" }
    
    m = inner.search(s)
    if m is None:
        return s
    inner_begin = m.start()

    m = end_inner.search(s)
    if m is None:
        return s
    inner_end = m.end()

    return (s[:inner_begin+1] 
           + make_replaces(s[inner_begin+1:inner_end-1],
                           inner_replaces)
           + make_brackets_hierarchy(s[inner_end-1:])
           )

        
def make_replaces(s, r=replaces):
    for fr, to in r.items():
        s = re.sub(fr, to, s)
    return s


def beautify(s):
    return make_brackets_hierarchy(make_replaces(s))
