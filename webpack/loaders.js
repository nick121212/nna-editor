'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.tslint = {
    test: /\.tsx?$/,
    loader: 'tslint',
    exclude: /node_modules/,
};

exports.tsx = {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
    exclude: /node_modules/,
    query: {
        presets: ['babili']
    }
};

exports.ts = {
    test: /\.ts$/,
    loader: 'ts-loader'
};

exports.istanbulInstrumenter = {
    test: /^(.(?!\.test))*\.tsx?$/,
    loader: ['istanbul-instrumenter-loader'],
    query: {
        embedSource: true,
        esModules: true
    }
};

exports.html = {
    test: /\.html$/,
    loader: 'raw-loader',
    exclude: /node_modules/,
};

exports.css = {
    test: /\.css$/,
    // exclude: /node_modules/,
    use: [{
        loader: 'style-loader',
    }, {
        loader: 'css-loader',
        options: {
            sourceMap: true,
            importLoaders: 1,
        }
    }]
};

exports.scss = {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'sass-loader', 'postcss-loader']
    })
};

exports.js = { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' };

exports.json = {
    test: /\.json$/,
    loader: 'json-loader',
};

exports.svg = makeUrlLoader(/\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, ["file-loader"]);
exports.eot = makeUrlLoader(/\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/, ["file-loader"]);
exports.woff = makeUrlLoader(/\.woff?(\?v=[0-9]\.[0-9]\.[0-9])?$/);
exports.woff2 = makeUrlLoader(/\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/);
exports.ttf = makeUrlLoader(/\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/, ["file-loader"]);

function makeUrlLoader(pattern, loaders) {
    return {
        test: pattern,
        loader: ['url-loader?limit=10000&mimetype=application/font-woff'].concat(loaders || []),
        // exclude: /node_modules/,
    };
}