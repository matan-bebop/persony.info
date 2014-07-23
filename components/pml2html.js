var pml = require("../utils/pml"),
	translit = require("../utils/translit/translit.js");

exports.Translator = function(seq) { // class Translator

	var posylannya_handler = function(text, link) {
		return "<a href=\"" + link + "\" target=\"_blank\">" + text + "</a>";
	},
	dzherelo_handler = function(text, link) {
		return posylannya_handler(text, link);
	},
	persona_handler = function(text, name) {
		romanized_name = translit.Url.code(name.replace(/_/g,'-')).toLowerCase(); // Ugly
		return "<a href=\"" + "/p/" + romanized_name + "\">" + text + "</a>";
	},
	cytata_handler = function(text) {
		return "<q>" + text + "</q>";
	};

	var tr = new pml.Translator();

	tr.tags = {
		"посилання" : pml.two_args(posylannya_handler),
		"джерело" : pml.two_args(dzherelo_handler),
		"персона" : pml.two_args(persona_handler),
		"цитата"  : pml.one_arg(cytata_handler)
	};

	this.translate = function(pml_str) {
		return tr.translate(pml_str);
	}
} // end class Translator
