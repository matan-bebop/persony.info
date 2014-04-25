var PML = (function () { // BEGIN Namespace PML

// private:

function split_pos(str, i)
{
	if(i > 0) {
		return [str.slice(0, i), str.slice(i+1)];
	} else {
		return str;
	}
}

function split_first(str, sep) 
{
	return split_pos(str, str.indexOf(sep));
}

function split_last(str, sep) 
{
	return split_pos(str, str.lastIndexOf(sep));
}

function one_arg (fun)
{
	return function(str) { return fun(str); };
}

function two_args(fun)
{
	// The last word is considered to be second argument
	return function(str) { 
		var arg1_n_arg2 = split_last(str, ' ');
		return fun(arg1_n_arg2[0], arg1_n_arg2[1]);
	}
}

// public:

return {

one_arg : one_arg,
two_args : two_args,

Translator : function() { // BEGIN Class Translator

	// private:

	var that = this; // A hook for class methods to access its properties

	// public:

	this.tag_delimiters = '*'; // Set the default delimiters
	this.tags = {}; // Tags and tag handlers are set by library user

	this.translate = function(pml)
	{
		var slices = pml.split(that.tag_delimiters),
			result = slices[0];
		
		var cmd_n_text, name_n_args, j;

		for (var i = 1; i < slices.length; i++) {
			name_n_args = split_first(slices[i], ' ');
			if (typeof that.tags[name_n_args[0]] != "undefined") {
				result += that.tags[name_n_args[0]](name_n_args[1]);
			} else { // Unknown tag
				result += slices[i]; // Leave the text inside delimiters as is
			}
		}
		
		return result;
	}
} // END Class Translator

}; // End namespace PML public

})(); // END Namespace PML
