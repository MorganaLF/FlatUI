module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jquery": true
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-new": 0,
    "no-underscore-dangle": 0
  },
  "extends": "airbnb"
};