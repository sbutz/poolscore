module.exports = {
    //TODO: unify eslint configs
    root: true,
    extends: [
        "airbnb",
        "airbnb-typescript",
    ],
    parserOptions: {
        project: "./tsconfig.json",
    },
};