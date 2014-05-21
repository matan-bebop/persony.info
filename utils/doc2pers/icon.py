import re

class Icon:
    def __init__(self, in_title, in_link, icon_name):
        self.in_title = None; self.in_link = None

        if in_title:
            self.in_title = re.compile(in_title)
        if in_link:
            self.in_link = re.compile(in_link)
        
        self.name = icon_name

    def appropriate_for(self, source):
        if self.in_link and self.in_link.search(source["link"].lower()):
            return True
        if self.in_title and self.in_title.search(source["title"].lower()):
            return True

        return False
        

icons = [Icon("відео",
              "(youtube|youtu.be|rutube|dailymotion|vimeo|video.bigmir)",
              "video-camera"),
         Icon("інтерв’ю",              None,                     "microphone"),
         Icon("вікіпеді",              "wikipedia",              "wiki"),
         Icon("фейсбу",                "facebook",               "facebook"),
         Icon(r"(твіт(т)?(ер(і)?)?\s|твіт(т)?(ер(і)?)?$)",
              "twitter.com",            
              "twitter"),
         Icon("вконтакт",              r"(vk.com|vkontakte.ru)", "vk"),
         Icon(r"гугл[о ]плюс",         "plus.google",            "google-plus"),
         Icon(r"(офіційн|персональн)", r"\.gov(\...)?(/.*)?$",   "link"),
         Icon(r".*",                   None,                     "info")]


def source_icon(source):
    for icon in icons:
        if icon.appropriate_for(source):
            return icon.name

    raise LookupError("Сталося щось дивне. Перехрестіться, перевантажте машину та"
                      "спробуйте ще раз.")
