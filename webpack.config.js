var glob = require('glob');
var path = require('path');

module.exports = {
    entry: glob.sync('../front-end/src/**.js').reduce(function(obj, el){
        obj[path.parse(el).name] = el;
        return obj
    },{}),
    output: {
        path: path.resolve(__dirname, '../front-end/dist/'),
        filename: "[name]"
    }
}