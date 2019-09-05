module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "comma-dangle" : [
        "error" , "never"
    ],
    "no-unused-vars" : [
        "error" , {
            "vars" : "local" ,  "args" : "none"
        }
    ],
    "linebreak-style": 0,
    "camelcase":"off",
    "no-console":"off"
  },
};
