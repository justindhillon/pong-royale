const path = require('path');

module.exports = {
    entry: './front-end/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './front-end/dist'),
    },
};
