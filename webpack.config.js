const path = require('path');

module.exports = {
    entry: './front-end/game.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './front-end/dist'),
    },
};
