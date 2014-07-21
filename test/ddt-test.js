var ddt = require('../ddt');

var config = {
    inputs: [1, 2, 3, 4, 5, 6,],

    outputs: [2, 4, 6, 8, 10, 12],

    transform: function(input) {
        return 2 * input;
    },

    validate : function(result, output) {
        return result == output;
    },

    groupName: 'Doulbe of a number',

    caseName: function(index, inputs, outputs) {
        return 'Doubling of number ' + inputs[index] + ' should return ' + outputs[index];
    }
}

ddt.test(config);
