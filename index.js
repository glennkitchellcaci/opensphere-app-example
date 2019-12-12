'use strict';

const fs = require('fs');
const path = require('path');
const resolver = require('opensphere-build-resolver/utils');

/**
 * Directory containing build artifacts generated by `opensphere-build-resolver`.
 * @type {string}
 */
const buildDir = '.build';

/**
 * Path to the build directory.
 * @type {string}
 */
const buildPath = path.join(__dirname, buildDir);

/**
 * Path to the built version file.
 * @type {string}
 */
const versionFile = path.join(buildPath, 'version');

/**
 * Relative path of the built version directory.
 * @type {string}
 */
const version = fs.readFileSync(versionFile, 'utf8').trim().replace(/.*\//, '');

/**
 * Relative path of the built distribution directory.
 * @type {string}
 */
const appVersion = fs.readFileSync(path.join(buildPath, 'version'), 'utf8').trim().replace(/.*\//, '');

/**
 * Version value from the package.json file.
 * @type {string}
 */
const packageVersion = require('./package').version;

/**
 * Resources for `opensphere-build-index` to include in the distribution and `index.html`.
 * @type {Array<Object>}
 */
const indexResources = [
  {
    source: buildPath,
    target: '',
    scripts: ['modernizr.js']
  },
  {
    source: resolver.resolveModulePath('openlayers/dist', __dirname),
    target: 'vendor/openlayers',
    css: ['ol.css']
  },
  {
    source: resolver.resolveModulePath('jquery/dist', __dirname),
    target: 'vendor/jquery',
    scripts: ['jquery.min.js']
  },
  {
    source: resolver.resolveModulePath('bootstrap/dist', __dirname),
    target: 'vendor/bootstrap',
    scripts: ['js/bootstrap.bundle.min.js']
  },
  {
    source: resolver.resolveModulePath('opensphere/vendor/jquery', __dirname),
    target: 'vendor/jquery',
    scripts: ['jquery.event.drag-2.3.0.js']
  },
  {
    source: resolver.resolveModulePath('css-element-queries/src', __dirname),
    target: 'vendor/css-element-queries',
    scripts: ['ResizeSensor.js']
  },
  {
    source: resolver.resolveModulePath('opensphere/vendor/jquery-ui', __dirname),
    target: 'vendor/jquery-ui',
    css: ['lightness/jquery-ui-1.12.1.min.css'],
    scripts: ['jquery-ui-1.12.1.min.js'],
    files: ['lightness/images']
  },
  {
    source: resolver.resolveModulePath('bootstrap/dist', __dirname),
    target: 'vendor/bootstrap',
    scripts: ['js/bootstrap.bundle.min.js']
  },
  {
    source: resolver.resolveModulePath('moment/min', __dirname),
    target: 'vendor/moment',
    scripts: ['moment.min.js']
  },
  {
    source: resolver.resolveModulePath('angular', __dirname),
    target: 'vendor/angular',
    scripts: ['angular.min.js']
  },
  {
    source: resolver.resolveModulePath('angular-animate', __dirname),
    target: 'vendor/angular',
    scripts: ['angular-animate.min.js']
  },
  {
    source: resolver.resolveModulePath('angular-sanitize', __dirname),
    target: 'vendor/angular',
    scripts: ['angular-sanitize.min.js']
  },
  {
    source: resolver.resolveModulePath('angular-route', __dirname),
    target: 'vendor/angular',
    scripts: ['angular-route.min.js']
  },
  {
    source: resolver.resolveModulePath('opensphere/vendor/angular-ui', __dirname),
    target: 'vendor/angular',
    scripts: [
      'angular-ui.js',
      'angular-ui-utils/scroll/ui-scroll.js',
      'angular-ui-utils/scroll/ui-scroll-jqlite.js'
    ]
  },
  {
    source: resolver.resolveModulePath('cesium/Build/Cesium', __dirname),
    target: 'vendor/cesium',
    files: [
      'Cesium.js',
      'Assets',
      'ThirdParty',
      'Workers'
    ]
  },
  {
    source: resolver.resolveModulePath('opensphere-asm/dist', __dirname),
    target: '',
    scripts: ['os-load.js'],
    files: [
      'os-wasm.js',
      'os-wasm.wasm',
      'os-asm.js',
      'os-asm.js.mem'
    ]
  },
  {
    source: resolver.resolveModulePath('opensphere/vendor/fonts/typeface-open-sans', __dirname),
    target: 'vendor/fonts/typeface-open-sans',
    files: ['files', 'index.css']
  },
  {
    source: resolver.resolveModulePath('markdown-it/dist', __dirname),
    scripts: ['markdown-it.min.js']
  }
];

/**
 *
 */
module.exports = {
  appVersion: appVersion,
  packageVersion: packageVersion,
  basePath: __dirname,
  distPath: path.join('dist', 'opensphere-app-example'),
  templates: [
    {
      id: 'index',
      file: 'index-template.html',
      resources: indexResources
    }
  ],
  debugCss: path.join(buildDir, 'themes/default.combined.css'),
  compiledCss: path.join(version, 'styles', 'themes/default.min.css'),
  compiledJs: path.join(appVersion, 'opensphere-app-example.min.js')
};
