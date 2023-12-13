const path = require('path');

module.exports = {
    entry: ['./front-end/src/graphics.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './front-end/dist'),
    },
    stats: 'errors-only',
};
