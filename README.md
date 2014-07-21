ddt
===
A Data Driven Test library for node.js

This module iterates a list of input test data and for each data creates a test case by transforming the data and validating the generated result with expected data in the output list.
## API
Require the `ddt` module and call `test` method against a `config` object.
```javascript
var ddt = require('ddt');
ddt.test(config);
```
save the file e.g. `test.js` and then execute the test with `mocha`
```
mocha test.js
```
**config**

* `inputs`: an array of test case inputs.
* `outputs`: an array of expected test results.
* `transform(input)`: a function for trasforming an input test case data, this is the function to be tested. Parameter `input` is the input test case data.
* `validate(expected, actual)`: a function for validating transformed data (from input) to expected value which is from `outputs` array. 
* `groupName`: a string value representing the group name for all the test cases. If the value is not specified, then all the test cases will be not grouped.
* `caseName`: could be a string or a function. If it s string value, each test case will be nameed with it; if it is a function, the test case name will be generated from calling of it. The function accepts 3 parameters: `index`, `inputs` and `outputs` for helping generating name based on actual test case.

## Example
Suppose have 6 test cases, each test case has an integer input number and the expected value is the double of the input number. So, the 6 input test cases are `[1, 2, 3, 4, 5, 6]` and the exptected outputs are `[2, 4, 6, 8, 10, 12]`
```javascript
var ddt = require('ddt');
var config = {
    inputs: [1, 2, 3, 4, 5, 6],
    outputs: [2, 4, 6, 8, 10, 12],
    trasform: function(input) {
        return 2 * input;
    },
    validate: function(expected, actual) {
        return expected == actual;
    },
    groupName: 'Double of a number',
    caseName: function(index, inputs, outputs) {
        return 'Doubling of number ' + inputs[index] + ' should return ' + outputs[index];
    }
};

ddt.test(config);
```

Save the file as `test.js` then use `mocha` to run the tests

```
mocha test.js --reporter spec
```
The test result is:
```
 Double of a number
    ✓ Doubling of number 1 should return 2 
    ✓ Doubling of number 2 should return 4 
    ✓ Doubling of number 3 should return 6 
    ✓ Doubling of number 4 should return 8 
    ✓ Doubling of number 5 should return 10 
    ✓ Doubling of number 6 should return 12
```
## Test
Make sure `mocha` is installed globally
```
npm install mocha -g
```

Run `npm test` to run unit test

## License
MIT
