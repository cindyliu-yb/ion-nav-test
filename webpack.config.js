'use strict';
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const DashboardPlugin = require('webpack-dashboard/plugin');
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const autoprefixer = require('autoprefixer');

var DEFAULT_TARGET = 'app';
var target = process.env.TARGET || DEFAULT_TARGET;
var port = process.env.PORT || 5000;
var host = process.env.HOST || 'localhost';
var mode = process.env.MODE || 'dev';
var serverUrl = process.env.SERVER_URL || '';
var targetPlatform;
var clientFolder = require('./.yo-rc.json')['generator-mcfly-ng2'].clientFolder;
var distFolder = path.join('dist', target, mode);

var fileExistsSync = function(file) {
    try {
        fs.accessSync(file);
        return true;
    } catch (e) {
        return false;
    }
};

var isTargetFuse = function(target) {
    if (targetPlatform) {
        return targetPlatform === 'FUSE';
    }
    return fileExistsSync(path.join(clientFolder, 'scripts', target, 'index.ux'));
};

var isTargetIonic2 = function(target) {
    if (targetPlatform) {
        return targetPlatform === 'IONIC';
    }
    return fileExistsSync(path.join(clientFolder, 'scripts', target, 'ionic.config.json'));
};

var getTargetPlatform = function() {
    if (targetPlatform) {
        return targetPlatform;
    }

    if (isTargetIonic2(target)) {
        return 'IONIC';
    }
    if (isTargetFuse(target)) {
        return 'FUSE';
    }
    return 'WEB';
};
targetPlatform = getTargetPlatform();

var getPlatformTemplateSuffix = function(opts) {
    opts = opts || {};
    if (isTargetIonic2(target) && !opts.noionic) {
        return '.ionic.html';
    }
    if (isTargetFuse(target) && !opts.nofuse) {
        return '.ngux';
    }
    return '.html';
};

var getPlatformStyleSuffix = function(opts) {
    opts = opts || {};
    if (isTargetIonic2(target) && !opts.noionic) {
        return '.ionic.scss';
    }

    return '.scss';
};

//     return fileExistsSync(path.join(clientFolder, 'scripts', target, 'ionic.config.json'));
// };

// make sure the target exists
if (!fileExistsSync(path.join(clientFolder, 'scripts', target))) {
    var error = 'The target ' + target + ' does not exist';
    throw error;
}

//var targetToSuffix = function(targetname) {
//    return targetname === DEFAULT_TARGET ? '' : '-' + targetname;
//};
//var suffix = targetToSuffix(target);
var pluginsProd = mode === 'prod' ? [
    //new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: false,
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
    })
] : [];

var alias = isTargetFuse(target) ? {
    'rxjs': path.resolve('./node_modules/rxjs'),
    'lodash': path.resolve('./node_modules/lodash'),
    'ionic-angular': path.resolve('./mocks/ionic'),
    'ionic-native': path.resolve('./mocks/ionic-native'),
    'iscroll': path.resolve('./mocks/iscroll'),
    'signature_pad': path.resolve('./mocks/signature_pad'),
    'ag-grid-ng2': path.resolve('./mocks/ag-grid-ng2'),
    'ag-grid': path.resolve('./mocks/ag-grid'),
    'filesaverjs': path.resolve('./mocks/filesaverjs'),
    'flickity': path.resolve('./mocks/flickity'),
    'photoswipe': path.resolve('./mocks/photoswipe'),
    'angular2-google-maps': path.resolve('./mocks/angular2-google-maps'),
    'angular2-tree-component': path.resolve('./mocks/angular2-tree-component'),
    'mapbox-gl': path.resolve('./mocks/mapbox-gl'),
    'highcharts': path.resolve('./mocks/highcharts'),
    'twilio-common': path.resolve('./mocks/twilio'),
    'twilio-conversations': path.resolve('./mocks/twilio'),
    'jpeg-camera': path.resolve('./mocks/jpeg-camera'),
    'croppie': path.resolve('./mocks/croppie'),
    'webworkify': 'webworkify-webpack'
} : isTargetIonic2(target) ? {
    'rxjs': path.resolve('./node_modules/rxjs'),
    'lodash': path.resolve('./node_modules/lodash'),
    'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
    'ionic-angular': path.resolve('./node_modules/ionic-angular'),
    'jpeg-camera': path.resolve('./node_modules/jpeg-camera/dist/jpeg_camera_no_flash'),
    'webworkify': 'webworkify-webpack'
} : {
    'rxjs': path.resolve('./node_modules/rxjs'),
    'lodash': path.resolve('./node_modules/lodash'),
    'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
    'jpeg-camera': path.resolve('./node_modules/jpeg-camera/dist/jpeg_camera_no_flash'),
    'ionic-angular': path.resolve('./mocks/ionic'),
    'webworkify': 'webworkify-webpack'
};

module.exports = {
    devtool: mode === 'prod' ? 'source-map' : 'inline-source-map', //cheap-module-eval-source-map', //'eval-source-map',
    cache: true,
    context: path.resolve(path.join(clientFolder, 'scripts', target)), // the base directory for resolving the entry option
    entry: {
        'polyfills': './polyfills',
        'vendor': './vendor',
        'bundle': './bootstrap'
    },

    output: {
        path: isTargetIonic2(target) ? path.resolve(path.join(distFolder, 'www')) : path.resolve(distFolder),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map' //,
            //chunkFilename: '[id].chunk.js',
            //devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.html', '.scss', '.sass'],
        alias: alias
    },
    node: { fs: 'empty' },
    externals: [{ './cptable': 'var cptable', './jszip': 'jszip' }],
    module: {
        rules: [
            /*{
                    enforce: 'pre',
                    test: /.js$/,
                    loader: 'string-replace-loader',
                    query: {
                        search: 'moduleId: module.id,',
                        replace: '',
                        flags: 'g'
                    }
                }, */
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [/node_modules/]
            },

            {
                // A special ts loader case for node_modules so we can ignore errors
                test: /\.ts$/,
                loaders: ['angular2-template-loader', 'awesome-typescript-loader'],
                include: [/node_modules/, new RegExp(clientFolder), /test/, /fuse/, /mocks/]
            },
            // Support for ngux files
            {
                test: /\.ngux$/,
                loader: 'ngux-loader',
                query: {
                    subdir: 'ngux',
                    noEmitUx: true,
                    outputRoot: path.join(path.resolve(distFolder), 'ux')
                }
            },
            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            // Support for *.js mapbox files.
            {
                test: /\.js$/,
                include: path.resolve('node_modules/mapbox-gl-shaders/index.js'),
                loader: 'transform/cacheable?brfs'
            },
            // Support for CSS as raw text in client folder
            {
                test: /\.css$/,
                loader: 'to-string-loader!css-loader!postcss-loader',
                include: [new RegExp(clientFolder)]
            },
            // Support for CSS as injected style in node_module folder
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
                include: [/node_modules/, /external/]
            },
            // Support for SCSS as raw text in client folder
            {
                test: /\.scss$/,
                loader: 'to-string-loader!css-loader!postcss-loader!sass-loader?sourceMap',
                include: [new RegExp(clientFolder)]
            },
            // Support for SCSS as inject style in node_module folder
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader?sourceMap',
                include: [/node_modules/]
            },
            // Support for SCSS as raw text in client folder
            {
                test: /\.sass$/,
                // Passing indentedSyntax query param to node-sass
                loader: 'to-string-loader!css-loader!postcss-loader!sass-loader?indentedSyntax&sourceMap',
                include: [new RegExp(clientFolder)]
            },
            // Support for SCSS as inject style in node_module folder
            {
                test: /\.sass$/,
                // Passing indentedSyntax query param to node-sass
                loader: 'style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax&sourceMap',
                include: [/node_modules/]
            },
            // support for .html as raw text
            {
                test: /\.html$/,
                loader: 'html-loader?interpolate&-minimize',
                exclude: [new RegExp(clientFolder + '/scripts/' + target + '/index.html')]
            }, {
                test: /\.png$/,
                loader: 'url-loader?name=images/[hash].[ext]&prefix=img/&limit=5000'
            }, {
                test: /\.jpg$/,
                loader: 'url-loader?name=images/[hash].[ext]&prefix=img/&limit=5000'
            }, {
                test: /\.gif$/,
                loader: 'url-loader?name=images/[hash].[ext]&prefix=img/&limit=5000'
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&\-.]+)?$/,
                loader: 'url-loader?name=fonts/[hash].[ext]&prefix=font/&limit=5000'
            },

            {
                enforce: 'post',
                include: /node_modules\/mapbox-gl-shaders/,
                loader: 'transform',
                query: 'brfs'
            }
            /*, {
                enforce: 'post',
                test: /\.js$/,
                loader: 'string-replace-loader',
                query: {
                    search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
                    replace: 'var sourceMappingUrl = "";',
                    flags: 'g'
                }
            }*/
        ],
        noParse: [
            /zone\.js\/.+/,
            /es6-shim/,
            /reflect-metadata/,
            /web-animations/,
            /.+angular2\/bundles\/.+/,
            /filtrex/,
            /filesaverjs/,
            /signature_pad/,
            /yoobic-loopback-node-sdk/,
            /mapbox-gl\/dist\/.+/,
            /node_modules\/localforage\/dist\/localforage.js/
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        stats: 'errors-only',
        host: host,
        port: port,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        outputPath: distFolder
    },
    plugins: [
        new DashboardPlugin(),

        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                tslint: { emitErrors: false, failOnHint: false },
                sassLoader: { includePaths: [path.resolve(__dirname, './node_modules/ionicons/dist/scss')] },
                postcss: function() {
                    return [autoprefixer];
                },
                context: '/'
            }
        }),

        new webpack.DefinePlugin({
            CONFIG_SERVER: JSON.stringify(serverUrl),
            CONFIG_MODE: JSON.stringify(mode),
            CONFIG_HMR: process.argv.join('').indexOf('hot') > -1,
            CONFIG_IS_WEB: !isTargetFuse(target) && !isTargetIonic2(target),
            CONFIG_IS_FUSE: isTargetFuse(target),
            CONFIG_IS_IONIC2: isTargetIonic2(target),
            CONFIG_PLATFORM: JSON.stringify(targetPlatform),
            CONFIG_STYLE_SUFFIX: JSON.stringify(getPlatformStyleSuffix()),
            CONFIG_TEMPLATE_SUFFIX: JSON.stringify(getPlatformTemplateSuffix()),
            CONFIG_TEMPLATE_SUFFIX_NOIONIC: JSON.stringify(getPlatformTemplateSuffix({ noionic: true })),
            CONFIG_TEMPLATE_SUFFIX_NOFUSE: JSON.stringify(getPlatformTemplateSuffix({ nofuse: true })),
            APP_VERSION: JSON.stringify('' + require('./package.json').version),
            PUBNUB_PUBLISH_KEY: JSON.stringify('pub-c-5106c124-c556-4f17-b13f-ae70c85a8255'),
            PUBNUB_SUBSCRIBE_KEY: JSON.stringify('sub-c-13775026-9db7-11e4-b533-02ee2ddab7fe')
        }),

        new ForkCheckerPlugin(),

        // make sure we can import the chunks on node or fuse
        new webpack.BannerPlugin({
            banner: 'if (typeof window === "undefined") {window = global;}\n' +
                'if (typeof window["webpackJsonp"]) {webpackJsonp = window.webpackJsonp;}\n',
            raw: true,
            entryOnly: true
        }),
        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            clientFolder // location of your src
        ),

        new CommonsChunkPlugin({
            name: ['vendor', 'polyfills'] //'bundle',
        }),
        new HtmlwebpackPlugin({
            title: 'App - ' + target,
            baseUrl: '/',
            template: 'index.html',
            chunksSortMode: 'dependency'
                // inject: 'body',
                // chunks: ['polyfills', 'vendor', 'bundle'],
                // chunksSortMode: orderByList(['polyfills', 'vendor', 'bundle'])
        }),

        new CopyWebpackPlugin(isTargetIonic2(target) ? [{
            from: '../../resources',
            to: '../resources'
        }] : []),

        new CopyWebpackPlugin([{
            from: '../../images',
            to: './images'
        }]),

        new CopyWebpackPlugin(isTargetFuse(target) ? [{
            from: '../../../fuse',
            to: './fuse'
        }] : [], { ignore: ['*.ts'] }),

        new CopyWebpackPlugin([{
                from: 'index.!(html)'
            }]
            .concat([{
                from: './**/resources/**/*.*'
            }])
            .concat(isTargetFuse(target) ? [{
                from: '../yoobic/**/resources/**/*.*',
                to: './ux/external-ux/yoobic'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: './*/**/*.ux'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: '../../fonts',
                to: './fonts'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: '../form/*/**/*.ux',
                to: './form'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: '../yoobic/*/**/*.ux',
                to: './yoobic'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: '../../styles/ux',
                to: './styles'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: './**/*.uno'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: '../../uno',
                to: './uno'
            }] : [])
            .concat([{
                from: './images',
                to: './images'
            }])
            .concat(isTargetIonic2(target) ? [{
                from: './config.xml',
                to: '../config.xml' // we need to go up one folder in the case of ionic2
            }] : [])
            .concat(isTargetIonic2(target) ? [{
                from: './ionic.config.json',
                to: '../ionic.config.json' // we need to go up one folder in the case of ionic2
            }] : [])
            .concat(isTargetIonic2(target) ? [{
                from: './package.json',
                to: '../package.json' // we need to go up one folder in the case of ionic2
            }] : [])
            .concat(isTargetIonic2(target) ? [{
                from: './hooks',
                to: '../hooks' // we need to go up one folder in the case of ionic2
            }] : [])
        ) //,
        // new PostCompilePlugin({
        //     filename: path.join(distFolder, 'bundle.js')
        // })
    ].concat(pluginsProd)
};
