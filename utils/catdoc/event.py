import re

date_re = re.compile(r"(((?P<n1>\d+)\.)?((?P<n2>(\d+))\.)?(?P<year>\d+))")

tags_re = re.compile(r"\((\w+)(\s*,\s*\w+\s*)*\)")

uri_symbols = r"[^ ,\"]*"
supported_protocols = r"((https?)|(ftp))"

images_suffix_re_str = r"\.((png)|(jpg)|(gif)|(svg))"

def link_re_str(suffix):
    return "(?P<link>" + supported_protocols + r"://" \
            + uri_symbols + suffix + ")"

# # #

class Event(object):
    def __init__(self):
        self.start = None
        self.title = None
        self.body = None
        self.images = []
        self.sources = []
        self.tags = []


paragraph_rejected = False
last_paragraph = None

def read_paragraph(f):
    global paragraph_rejected, last_paragraph
    if paragraph_rejected:
        paragraph_rejected = False
        return last_paragraph
    s = ''
    for line in f:
        if line == '\n':
            last_paragraph = s
            return s
        s += line.lstrip()
    # We are here only in case of EOF
    if s: # Return the terminated paragraph, if any
        last_paragraph = s
        return s
    last_paragraph = None
    #else: return None

def unread_paragraph(f):
    global paragraph_rejected, last_paragraph
    paragraph_rejected = True
    return last_paragraph

def concat_lines(s, sep=""):
    return s.replace('\n', sep)

def parse_date(s):
    m = date_re.match(s)
    if m:
        d = m.groupdict()
        if(len(d["year"]) == 2): # Short year format
            # should be turned into the full format
            s = "20" + d["year"]
            if d["n2"] is not None:
                s = d["n2"] + '.' + s
            if d["n1"] is not None:
                s = d["n1"] + '.' + s
        return s


def read_title(f):
    par = concat_lines(read_paragraph(f), ' ')
    if par is not None:
        return par.strip()


def read_body(f):
    return concat_lines(read_paragraph(f), ' ')

# # #

def fetch_title(uri):
    return uri

def parse_simple_link(s, suffix):
    m = re.match(r"((?P<title>.*),\s*)?" + link_re_str(suffix),
                 s, re.IGNORECASE)
    if m is None:
        return
    d = m.groupdict()
    if not d["title"]:
        d["title"] = fetch_title(d["link"])
    return d


def parse_msword_link(s, suffix):
    m = re.match(r'HYPERLINK\s*"(?P<title>.*)"\s*' + link_re_str(suffix),
                 s, re.IGNORECASE)
    if m is None:
        return
    d = m.groupdict()
    if d["title"] == d["link"]:
        d["title"] = fetch_title(d["link"])
    return d


def parse_hybrid_link(s, suffix):
    m = re.match(r'(?P<title>.*),\s*HYPERLINK\s*".*"\s*'
                + link_re_str(suffix), s, re.IGNORECASE)
    if m is None:
        return
    return m.groupdict()


def parse_link(s, suffix=""):
    l = parse_msword_link(s, suffix)
    if l is None:
        l = parse_simple_link(s, suffix)
        if l is None:
            l = parse_hybrid_link(s, suffix)
    if l is not None:
        if l["link"][-1:] == '/':
            l["link"] = l["link"][:-1] 
        return l


def parse_local_link(s, suffix=""):
    if re.match(uri_symbols + suffix, s, re.IGNORECASE) is not None:
        return s

def parse_source(s):
    return parse_link(s);


def parse_image(s):
    i = parse_link(s, images_suffix_re_str)
    if i is None:
        i = parse_local_link(s, images_suffix_re_str)
        if i is not None: # TODO: Image caption
            return i
        else:
            return
    return i["link"]


def extract_tags(s, tags):
    m = tags_re.search(s)
    if m is None:
        return s
    tags.append("світ") # TODO Many tags
    return re.sub(tags_re, "", s)

# # #

def skip_empty_lines(f):
    s = read_paragraph(f)
    while not s and s is not None:
        s = read_paragraph(f)
    return unread_paragraph(f)
    

def read_event(f, previous_date=None):
    ev = Event()

    global last_paragraph

    skip_empty_lines(f)
    par = read_paragraph(f)
    if par is None: return # EOF when no event data has been read
    ev.start = parse_date(extract_tags(concat_lines(par, ' '), ev.tags))
    if ev.start is None:
        if previous_date is None:
            return # Error
        ev.start = previous_date

    skip_empty_lines(f)
    ev.title = read_title(f)

    skip_empty_lines(f)
    ev.body = read_body(f)

    while True:
        skip_empty_lines(f)
        par = read_paragraph(f)
        if par is None:
            break # EOF after everything've been read successfully
        i = parse_image(concat_lines(par))
        if i is None:
            s = parse_source(concat_lines(par))
            if s is None:
                # The paragraph is neither a valid source, nor an image.
                # Unread it for further processing.
                unread_paragraph(f)
                break
            else:
                ev.sources.append(s)
        else:
            ev.images.append(i)

    return ev

# TODO Replace "", <<>>, “” to «» in all text fields
