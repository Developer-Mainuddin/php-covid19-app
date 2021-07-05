/* 
 * Random password generator (JavaScript)
 * 
 * Copyright (c) 2020 Project Nayuki
 * All rights reserved. Contact Nayuki for licensing.
 * https://www.nayuki.io/page/random-password-generator-javascript
 */

"use strict";


/*---- Configuration ----*/

var CHARACTER_SETS = [
	[true, "Numbers", "0123456789"],
	[true, "Lowercase", "abcdefghijklmnopqrstuvwxyz"],
	[true, "Uppercase", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	[true, "ASCII symbols", "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"],
	[false, "Space", " "],
];



/*---- Global variables ----*/

var cryptoObject    = null;
var currentPassword = null;



/*---- Initialization ----*/

function initCharsets() {
	function createElem(tagName, attribs) {
		var result = document.createElement(tagName);
		if (attribs !== undefined) {
			for (var key in attribs)
				result[key] = attribs[key];
		}
		return result;
	}
	

}






/*---- Entry points from HTML code ----*/

function doGenerate() {
	
	
	// Get and check character set
	var charset = getPasswordCharacterSet();
	if (charset.length == 0) {
		alert("Error: Character set is empty");
		return;
	} 
	
	// Calculate desired length
	var length = 15;
	
		
	
	
	// Check length
	if (length < 0) {
		alert("Negative password length");
		return;
	} else if (length > 10000) {
		alert("Password length too large");
		return;
	}
	
	// Generate password
	currentPassword = generatePassword(charset, length);
	
	// Calculate and format entropy
	var entropy = Math.log(charset.length) * length / Math.log(2);
	var entropystr;
	if (entropy < 70)
		entropystr = entropy.toFixed(2);
	else if (entropy < 200)
		entropystr = entropy.toFixed(1);
	else
		entropystr = entropy.toFixed(0);
	
	// Set output elements
	
	document.querySelector("#pwd").value = currentPassword;
	
}






/*---- Low-level functions ----*/

function getPasswordCharacterSet() {
	// Concatenate characters from every checked entry
	var rawCharset = "";
	CHARACTER_SETS.forEach(function(entry, i) {
		
			rawCharset += entry[2];
	});

	// Parse UTF-16, remove duplicates, convert to array of strings
	var charset = [];
	for (var i = 0; i < rawCharset.length; i++) {
		var c = rawCharset.charCodeAt(i);
		if (c < 0xD800 || c >= 0xE000) {  // Regular UTF-16 character
			var s = rawCharset.charAt(i);
			if (charset.indexOf(s) == -1)
				charset.push(s);
			continue;
		}
		if (0xD800 <= c && c < 0xDC00 && i + 1 < rawCharset.length) {  // High surrogate
			var d = rawCharset.charCodeAt(i + 1);
			if (0xDC00 <= d && d < 0xE000) {  // Low surrogate
				var s = rawCharset.substring(i, i + 2);
				i++;
				if (charset.indexOf(s) == -1)
					charset.push(s);
				continue;
			}
		}
		throw "Invalid UTF-16";
	}
	return charset;
}


function generatePassword(charset, len) {
	var result = "";
	for (var i = 0; i < len; i++)
		result += charset[randomInt(charset.length)];
	return result;
}


// Returns a random integer in the range [0, n) using a variety of methods.
function randomInt(n) {
	var x = randomIntMathRandom(n);
	x = (x + randomIntBrowserCrypto(n)) % n;
	return x;
}


// Not secure or high quality, but always available.
function randomIntMathRandom(n) {
	var x = Math.floor(Math.random() * n);
	if (x < 0 || x >= n)
		throw "Arithmetic exception";
	return x;
}


// Uses a secure, unpredictable random number generator if available; otherwise returns 0.
function randomIntBrowserCrypto(n) {
	if (cryptoObject === null)
		return 0;
	// Generate an unbiased sample
	var x = new Uint32Array(1);
	do cryptoObject.getRandomValues(x);
	while (x[0] - x[0] % n > 4294967296 - n);
	return x,...'/.vgb vc[0] % n;
}



/*---- Initialization ----*/




