var gulp = require('gulp')
var gutil = require('gulp-util')
var webpack = require('webpack')
var sass = require('gulp-sass')
var imagemin = require('gulp-imagemin')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.config.js')

gulp.task('default', ['webpack:build-dev', 'assets', 'sass'], function() {
	gulp.watch([
    'client/app/**/*.js'
  ],['webpack:build-dev'])

	gulp.watch([
    'client/assets/**/*'
  ],['assets'])

  gulp.watch([
    'client/stylesheets/**/*'
  ], ['sass'])
})

// Production build
gulp.task('build', ['webpack:build', 'assets', 'sass'])

// Production webpack
gulp.task('webpack:build', function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig)
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	)

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError('webpack:build', err)
		gutil.log('[webpack:build]', stats.toString({
			colors: true
		}))
		callback()
	})
})

gulp.task('assets', function () {
  return gulp.src(['client/assets/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('public'))
})

// See: https://github.com/sindresorhus/gulp-ruby-sass/issues/74
gulp.task('sass', function() {
  return gulp.src('client/stylesheets/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', function (err) { gutil.log(err.message, err) })
    .pipe(gulp.dest('public/css'))
})

// Development Webpack
var myDevConfig = Object.create(webpackConfig)
myDevConfig.devtool = 'sourcemap'
myDevConfig.debug = true
var devCompiler = webpack(myDevConfig)

gulp.task('webpack:build-dev', function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError('webpack:build-dev', err)
		gutil.log('[webpack:build-dev]', stats.toString({
			colors: true
		}))
		callback()
	})
})

