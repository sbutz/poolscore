module.exports = {
    root: true,
    extends: [
        "airbnb",
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:react/jsx-runtime",
    ],
    parserOptions: {
        project: "./tsconfig.json",
    },
    rules: {
        "consistent-return": "off",
        "no-console": "warn",
        "no-underscore-dangle": "off",
        "react/require-default-props": [
            2,
            {
                functions: "defaultArguments",
            },
        ],
    },
};