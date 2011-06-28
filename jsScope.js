"use strict";

var fs 		= require('fs');


/**
 * CALLBACK
 * @param objScope
 * @param funcName
 * @returns {Function}
 */
function CALLBACK(objScope, funcName) {
	return function() { 
		objScope[funcName].apply(objScope, arguments);
	};
};




var MyClass			= function() {
	this.myObject	= {};
	this.name		= "MyClass";
};

/**
 * doSomethingWithFileData
 * @param err
 * @param fileData
 */
MyClass.prototype.doSomethingWithFileData	= function(err, fileData) {
	if(typeof this.myObject !== 'object' && this.name !== "MyClass") {
		console.log("You fail! Scoping error, 'this' is not the 'this' you are looking for.");
		console.log("'this': " + this);
		console.log("\n\n");
	}
	else {
		console.log("You win! 'this' is: " + this.name);
		console.log("Here is your data: \n" + fileData);
		console.log("\n\n");
	}
};


MyClass.prototype.readFileAsync				= function(filePath) {
	
	// Wrong
	fs.readFile(filePath, this.doSomethingWithFileData);
	
	// Right
	fs.readFile(filePath, CALLBACK(this, 'doSomethingWithFileData'));
};


if(!module.parent) {
	var myClassInstance	= new MyClass();
	myClassInstance.readFileAsync('./testData.txt');
}