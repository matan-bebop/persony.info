# -*- coding: utf-8
# cyr2url - URL-compatible fully reversible cyrillic transliterator
# Ukrainian URL (UURL) transliteration table

# Version: 0.99 (see. TODO)

# FEATURES:
# - transliterates all characters from Ukrainian, Russian and Belorussian alphabets + space character
# - fully reversible (including the lettercase for cyr-lat-cyr)
# - fully URL-compatible (latin characters, dot, underscore, tilde)
# - based on the transliteration standard developed by the Terminological Comission of the Natural Sciences (TCNS) of the Kyiv National University
# - decently readable transliterated form 

# Encoding of non-Ukrainian characters:
# э = eh, ў = w					# TCNS standard
# ы = yh, ё = joh, ъ = .h

# Examples:
#   Ukrajina 	= Україна		# TCNS standard
# 	cvtitenj 	= цвітень		# TCNS
# 	горщик		= ghorshhyk		# TCNS
# 	p.jatj		= п'ять
#   z~jorzhenyj = зйоржений
#	ob.hjavytj	= объявить		# Russian alphabet
#	johzhyk		= ёжик			# Russian 
#	ehlektron	= электрон		# Russian & Belorussian 
#	pownyh		= поўны			# Belorussian

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  MIT License  # 
# Copyright (c) 2011, Andriy V. Makukha
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights 
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
# copies of the Software, and to permit persons to whom the Software is 
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in 
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

class Cyr2Url(object):
	def __init__(self,apo='.',stop='~',space='_'):
		self.code_arr = {
			u'а':'a',
			u'б':'b',
			u'в':'v',
			u'г':'gh',
			u'ґ':'g',
			u'д':'d',
			u'ё':'joh',
			u'е':'e',
			u'є':'je',
			u'э':'eh',
			u'ж':'zh',
			u'з':'z',
			u'и':'y',
			u'і':'i',
			u'ї':'ji',
			u'й':'j',
			u'к':'k',
			u'л':'l',
			u'м':'m',
			u'н':'n',
			u'о':'o',
			u'п':'p',
			u'р':'r',
			u'с':'s',
			u'т':'t',
			u'у':'u',
			u'ў':'w',
			u'ф':'f',
			u'х':'kh',
			u'ц':'c',
			u'ч':'ch',
			u'ш':'sh',
			u'щ':'shh',
			u'ь':stop+'j',
				u'bь':'bj',
				u'cь':'cj',
				u'dь':'dj',
				u'fь':'fj',
				u'gь':'gj',
				u'hь':'hj',
				u'kь':'kj',
				u'lь':'lj',
				u'mь':'mj',
				u'nь':'nj',
				u'pь':'pj',
				u'rь':'rj',
				u'sь':'sj',
				u'tь':'tj',
				u'vь':'vj',
				u'wь':'wj',
				u'zь':'zj',
			   u'ohь':'oh'+stop+'j',
			   u'ehь':'eh'+stop+'j',
			   u'yhь':'yh'+stop+'j',
			apo+u'hь':apo+'h'+stop+'j',
			u'ъ':apo+'h',
			u'ы':'yh',
			u'ю':'ju',
			u'я':'ja',
			 " ":space,
			 "'":apo,
			u'’':apo,
		   u'jе':'j'+stop+'e',
		   u'jі':'j'+stop+'i',
		   u'jу':'j'+stop+'u',
		   u'jа':'j'+stop+'a',
		   
		   u'bй':'b'+stop+'j',
		   u'cй':'c'+stop+'j',
		   u'vй':'v'+stop+'j',
		   u'wй':'w'+stop+'j',
		   u'hй':'h'+stop+'j',
			  u'ohй':'ohj',
			  u'ehй':'ehj',
			  u'yhй':'yhj',
		   apo+u'hй':apo+'hj',
		   u'gй':'g'+stop+'j',
		   u'dй':'d'+stop+'j',
		   u'zй':'z'+stop+'j',
		   u'kй':'k'+stop+'j',
		   u'lй':'l'+stop+'j',
		   u'mй':'m'+stop+'j',
		   u'nй':'n'+stop+'j',
		   u'pй':'p'+stop+'j',
		   u'rй':'r'+stop+'j',
		   u'sй':'s'+stop+'j',
		   u'tй':'t'+stop+'j',
		   u'fй':'f'+stop+'j',
		}
		self.decode_arr = {
			'a':u'а',
			'b':u'б',
			'v':u'в',
		  u'ґh':u'г',
			'g':u'ґ',
			'd':u'д',
			'e':u'е',
		 u'йоh':u'ё',
		 u'ьоh':u'ё',
		  u'йe':u'є',
		  u'ьe':u'є',
		  u'еh':u'э',
		  u'єh':u'йэ',
		  u'зh':u'ж',
			'z':u'з',
			'y':u'и',
			'i':u'і',
		  u'йi':u'ї',
		  u'ьi':u'ї',
			'k':u'к',
			'l':u'л',
			'm':u'м',
			'n':u'н',
			'o':u'о',
			'p':u'п',
			'r':u'р',
			's':u'с',
			't':u'т',
			'u':u'у',
			'w':u'ў',
			'f':u'ф',
		  u'кh':u'х',
			'c':u'ц',
		  u'цh':u'ч',
		  u'сh':u'ш',
		  u'шh':u'щ',
		  u'иh':u'ы',
		  u"'h":u'ъ',
		  u'йu':u'ю',
		  u'ьu':u'ю',
		  u'йa':u'я',
		  u'ьa':u'я',
		 u'й'+stop+'a':u'йа',
		 u'й'+stop+'e':u'йе',
		 u'й'+stop+'i':u'йі',
		 u'й'+stop+'u':u'йу',
		 u'ь'+stop+'a':u'ьа',
		 u'ь'+stop+'e':u'ье',
		 u'ь'+stop+'i':u'ьі',
		 u'ь'+stop+'u':u'ьу',
			'j':u'й',
		  u'аj':u'ай',
		  u'бj':u'бь',
		  u'вj':u'вь',
		  u'ўj':u'ўь',
		  u'гj':u'гь',
		  u'ґj':u'ґь',
		  u'дj':u'дь',
		  u'еj':u'ей',
		  u'єj':u'єй',
		  u'жj':u'жь',
		  u'зj':u'зь',
		  u'иj':u'ий',
		  u'іj':u'ій',
		  u'їj':u'їй',
		  u'йj':u'йй',
		  u'кj':u'кь',
		  u'лj':u'ль',
		  u'мj':u'мь',
		  u'нj':u'нь',
		  u'оj':u'ой',
		  u'пj':u'пь',
		  u'рj':u'рь',
		  u'сj':u'сь',
		  u'тj':u'ть',
		  u'уj':u'уй',
		  u'фj':u'фь',
		  u'хj':u'хь',
		  u'цj':u'ць',
		  u'чj':u'чь',
		  u'шj':u'шь',
		  u'щj':u'щь',
		  u'ьj':u'ьй',
		  u'юj':u'юй',
		  u'яj':u'яй',

		  u'б'+stop+'j':u'бй',
		  u'в'+stop+'j':u'вй',
		  u'ў'+stop+'j':u'ўй',
		  u'г'+stop+'j':u'гй',
		  u'ґ'+stop+'j':u'ґй',
		  u'д'+stop+'j':u'дй',
		  u'ж'+stop+'j':u'жй',
		  u'з'+stop+'j':u'зй',
		  u'к'+stop+'j':u'кй',
		  u'л'+stop+'j':u'лй',
		  u'м'+stop+'j':u'мй',
		  u'н'+stop+'j':u'нй',
		  u'п'+stop+'j':u'пй',
		  u'р'+stop+'j':u'рй',
		  u'с'+stop+'j':u'сй',
		  u'т'+stop+'j':u'тй',
		  u'ф'+stop+'j':u'фй',
		  u'х'+stop+'j':u'хй',
		  u'ц'+stop+'j':u'цй',
		  u'ч'+stop+'j':u'чй',
		  u'ш'+stop+'j':u'шй',
		  u'щ'+stop+'j':u'щй',
		  u'й'+stop+'j':u'йь',
		   u'эj':u'эй',
		   u'ёj':u'ёй',
		   u'ыj':u'ый',

		  u'а'+stop+'j':u'аь',
		  u'е'+stop+'j':u'еь',
		  u'є'+stop+'j':u'єь',
		  u'и'+stop+'j':u'иь',
		  u'і'+stop+'j':u'іь',
		  u'ї'+stop+'j':u'їь',
		  u'о'+stop+'j':u'оь',
		  u'э'+stop+'j':u'эь',
		  u'ё'+stop+'j':u'ёь',
		  u'ы'+stop+'j':u'ыь',
		  u'у'+stop+'j':u'уь',
		  u'ъ'+stop+'j':u'ъь',
		  u'ю'+stop+'j':u'юь',
		  u'я'+stop+'j':u'яь',
		stop+'j':u'ь',
		   #u'’':"'",
			 apo:"'",
		   space:" "
		}


	def cap(self,x,s):							# TODO: it's a mess! should be rewritten
		#wc.printLog('x s',x+' '+s)
		i = 0
		while i<len(s) and x[i]==s[i].lower(): i += 1
		if i>=len(s): return s
		b,e = s[:i],s[i:]
		if len(e)>1 and e==e.upper():
			return b+x[i:].upper()
		if e[0]==e[0].upper() and e[0]!=e[0].lower(): # and s[0] not in "~'": 
			y = x[i].upper()+x[i+1:]
			if y!=x[i:]: return b+y		# Most cases (.H, ~J)
			return b+x[i:].upper()
		elif e[-1]==e[-1].upper(): 
			if e[0].lower()!=e[0].upper():
				return b+x[i]+x[i+1:].upper()
			else:
				return b+x[i:].upper()
		return b+x[i:]


	def r(self,s,arr,depth):
		i = 0
		while i < len(s):
			ins = False
			for j in range(min(depth,i+1),0,-1):
				if s[i+1-j:i+1].lower() in arr:
					ins = self.cap(arr[s[i+1-j:i+1].lower()],s[i+1-j:i+1])
					#wc.printLog(' ',ins)
					s = s[:i+1-j] + ins + s[i+1:]
					i += len(ins)-j+1
					break
			if ins==False: i+=1
		return s


	def code(self,s):
		r = self.r(s,self.code_arr,3)
		#if s[0].lower()==u'ь': r = '~'+r
		return r


	def decode(self,s):
		s = s.replace('eh',u'э').replace('Eh',u'Э').replace('EH',u'Э')		# So that "~jeh" is properly decoded
		return self.r(s,self.decode_arr,3)
    

def random_tests():
	# Run through random test cases
	total = 1000			# Number of test cases
	length = 20				# Length of test alphabets
	# # # # # # 
	print('FORMING TEST LIST')
	import random, codecs
	alphabet = list(u"бвгґджзйклмнпрстфхцчшщь аеєиіїоуюя'ёэъўы()[]-!?")
	tests = []
	for x in range(total):
		random.shuffle(alphabet)
		for y in range(length):
			if random.randint(0,1): continue
			if alphabet[y].islower(): alphabet[y] = alphabet[y].upper()
			else: alphabet[y] = alphabet[y].lower()
		tests.append(''.join(alphabet[:length]))
	print('TESTING...')
	c = Cyr2Url(apo="'",stop='.',space=' ')
	passed = 0
	#f = codecs.open('cyr2url.txt','w','utf-8')
	for t in tests:
		#ok = (t.lower()==c.decode(c.code(t)).lower())
		ok = (t==c.decode(c.code(t)))
		if ok: passed += 1
		else:
			print(c.code(t),ok)
			#f.write(t+' '+c.code(t)+' '+c.decode(c.code(t))+' '+str(ok)+'\n')
	print('Passed %d test cases out of %d' % (passed,total))

if __name__=='__main__':
	from sys import argv
	if len(argv)>1:
		c = Cyr2Url(apo="'",stop=u'·',space=' ')
		import codecs
		encode = argv[1]!='d'
		fn = argv[2]
		txt = codecs.open(fn,'r','utf-8').read()
		print(encode and 'Encoding' or 'Decoding')
		txt = encode and c.code(txt) or c.decode(txt)
		suffix = encode and 'uurl' or 'decoded'
		if '.' in argv[2]: 
			fn,ext = fn.rsplit('.',1)
			fn = '%s.%s.%s' % (fn,suffix,ext)
		else: 
			fn = fn+'.'+suffix
		codecs.open(fn,'w','utf-8').write(txt)
	else: random_tests()
