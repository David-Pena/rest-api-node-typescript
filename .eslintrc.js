module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "ignorePatterns": ['.eslintrc.js'],
    "rules": {
        "@typescript-eslint/semi": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-misused-promises": 0,
        "@typescript-eslint/member-delimiter-style": 0,
        "@typescript-eslint/consistent-type-assertions": 0,
        "@typescript-eslint/strict-boolean-expressions": 0,
        "@typescript-eslint/no-throw-literal": 0,
        "semi": ['error', 'always']
    }
}
