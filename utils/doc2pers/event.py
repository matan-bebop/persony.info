import re

date_re = re.compile(r"(((?P<n1>\d+)\.)?((?P<n2>(\d+))\.)?(?P<year>\d+))")

uri_symbols = r"[^ ,\"]*"
supported_protocols = r"((https?)|(ftp))"

images_suffix_re_str = r"\.((png)|(jpg)|(gif)|(svg))"

def link_re_str(suffix):
    return "(?P<link>" + supported_protocols + r"://" \
            + uri_symbols + suffix + ")"

replaces = {"---" : "—",
            "--" : "—",
            "<<" : "«",
            ">>" : "»",
            r'"([^"]*)"' : r"«\1»",
            "„" : "«",
            "“" : "»",
            "„" : "«",
            "”" : "»",
            "“" : "«",
            "”" : "»"
           }

# # #

class Event(object):
    def __init__(self):
        self.start = None
        self.end = None
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

    last_paragraph = f.readline()

    if not last_paragraph: # EOF?
        last_paragraph = None
    else:
        last_paragraph = last_paragraph.strip()
        return last_paragraph


def unread_paragraph(f):
    global paragraph_rejected, last_paragraph
    paragraph_rejected = True
    return last_paragraph


def beautify(body):
    s = body
    for fr, to in replaces.items():
        s = re.sub(fr, to, s)
    return s


def split_interval(s):
    l = s.split('-')
    if len(l) < 2:
        l = s.split('–')
        if len(l) < 2:
            l.append(None)
    return l

def parse_date(s):
    m = date_re.match(s)
    if m:
        d = m.groupdict()
        if(len(d["year"]) == 2): # Short year format?
            # Should be turned into the full format.
            s = "20" + d["year"]
            if d["n2"] is not None:
                s = d["n2"] + '.' + s
            if d["n1"] is not None:
                s = d["n1"] + '.' + s
        return s


def read_title(f):
    par = read_paragraph(f)
    if par is not None:
        return beautify(par.strip())

read_body = read_title

# # #

def fetch_title(uri):
    # TODO: Add automatic title fetching
    return uri

def parse_simple_link(s, suffix):
    m = re.match(r"((?P<title>.*),\s*)?" + link_re_str(suffix),
                 s, re.IGNORECASE)
    if m is None:
        return
    d = m.groupdict()
    if not d["title"]:
        d["title"] = fetch_title(d["link"])
    else:
        d["title"] = beautify(d["title"])
    return d


def parse_msword_link(s, suffix):
    m = re.match(r'HYPERLINK\s*"(?P<title>.*)"\s*' + link_re_str(suffix),
                 s, re.IGNORECASE)
    if m is None:
        return
    d = m.groupdict()
    if d["title"] == d["link"]:
        d["title"] = fetch_title(d["link"])
    else:
        d["title"] = beautify(d["title"])
    return d


def parse_hybrid_link(s, suffix):
    m = re.match(r'(?P<title>.*),\s*HYPERLINK\s*".*"\s*'
                + link_re_str(suffix), s, re.IGNORECASE)
    if m is None:
        return
    # TODO: Add fetch_title() and beatify() call
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
    l = re.split(r"[()]", s)
    if len(l) < 2:
        return s
    tags += [p.strip() for p in l[1].split(',')];
    return l[0]

# # #

def skip_empty_lines(f):
    s = read_paragraph(f)
    while not s and s is not None:
        s = read_paragraph(f)
    return unread_paragraph(f)
    

def read_event(f, previous_event=None):
    ev = Event()

    # Read the date & tags paragraph
    skip_empty_lines(f)
    par = read_paragraph(f)
    if par is None: 
        return # EOF when no event data has been read
    s = extract_tags(par, ev.tags)
    str_start, str_end = split_interval(s)
    ev.start = parse_date(str_start)
    if str_end:
        ev.end = parse_date(str_end)
    if ev.start is None:
        if previous_event is None:
            return # Error
        ev.start = previous_event.start
        ev.end = previous_event.end

    # Read title paragraph
    skip_empty_lines(f)
    ev.title = read_title(f)

    # Read body paragraph
    skip_empty_lines(f)
    ev.body = read_body(f)

    # Read paragraphs conainting either link to a source or to an image each
    while True:
        skip_empty_lines(f)
        par = read_paragraph(f)
        if par is None:
            break # EOF after everything've been read successfully
        i = parse_image(par)
        if i is None:
            s = parse_source(par)
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
