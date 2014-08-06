var assert = require('assert');
var oftype = require('oftype');

function test(config) {
    var inputs = config.inputs;
    var outputs = config.outputs;
    var transform = config.transform;
    var validate = config.validate || defaultValidate;
    var groupName = config.groupName;
    var caseName = config.caseName;

    if (inputs && outputs && transform) {
        if (!groupName) {
	    setup(config);
            testCase(caseName, inputs, outputs, transform, validate);
        } else {
            describe(groupName, function() {
	    	setup(config);
                testCase(caseName, inputs, outputs, transform, validate);
            });
        }
    };
}

function setup(config) {
    if (oftype(config.before, Function)) {
	before(config.before);
    }

    if (oftype(config.after, Function)) {
	after(config.after);
    }

    if (oftype(config.beforeEach, Function)) {
	beforeEach(config.beforeEach);
    }

    if (oftype(config.afterEach, Function)) {
	afterEach(config.afterEach);
    }
}

function testCase(caseName, inputs, outputs, transform, validate) {
    inputs.forEach(function(input, index) {
        var name = composeCaseName(caseName, index, inputs, outputs);
        it(name, function() {
            var result = transform(input);
            assert.ok(validate(outputs[index], result));
        });
    });
}

function composeCaseName(caseName, index, inputs, outputs) {
    if (!caseName) {
        return 'test case #' + index;
    } else if(oftype(caseName, String)) {
        return caseName;
    } else if (caseName instanceof Function) {
        return caseName(index, inputs, outputs);
    }
}

function defaultValidate(expected, actual) {
    return expected == actual;
}

exports.test = test;
