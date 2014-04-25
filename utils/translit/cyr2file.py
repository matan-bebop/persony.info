from . cyr2url import Cyr2Url

def Cyr2File():
    return Cyr2Url(space='_', open_brackets='~-', close_brackets='-~')
