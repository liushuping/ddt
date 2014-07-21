var assert = require('assert');

function test(config) {
    var inputs = config.inputs;
    var outputs = config.outputs;
    var transform = config.transform;
    var validate = config.validate;
    var groupName = config.groupName;
    var caseName = config.caseName;

    if (inputs && outputs && transform && validate) {
        if (!groupName) {
            testCase(caseName, inputs, outputs, transform, validate);
        } else {
            describe(groupName, function() {
                testCase(caseName, inputs, outputs, transform, validate);
            });
        }
    };
}

function testCase(caseName, inputs, outputs, transform, validate) {
    inputs.forEach(function(input, index) {
        var name = composeCaseName(caseName, index, inputs, outputs);
        it(name, function() {
            var result = transform(input);
            assert.ok(validate(result, outputs[index]));
        });
    });
}

function composeCaseName(caseName, index, inputs, outputs) {
    if (!caseName) {
        return 'test case #' + index;
    } else if(toString.call(caseName) == '[object String]') {
        return caseName;
    } else if (caseName instanceof Function) {
        return caseName(index, inputs, outputs);
    }
}

exports.test = test;
