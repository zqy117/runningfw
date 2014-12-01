'use strict';

var serverPort = process.env.X2U_SERVER_PORT || '9000'
	, srcPath = process.env.X2U_SRC || './src'
	, destPath = process.env.X2U_DEST || './target'

module.exports = function(grunt) {

	grunt.initConfig({
			
			pkg   : grunt.file.readJSON('package.json')

		, connect: {
			options : { port: serverPort }
			, dev : {
				options : {
						hostname  : '*'
					, base    : './'
					, middleware: function(connect, options) {
						return [
							require('connect-livereload')({
								port: 35730
							})
							// Serve static files. 
							// In my environment options.base is a type of Object
							, connect.static(options.base.toString())
							// Make empty directories browsable.
							, connect.directory(options.base)
						]
					}
				}
			}
		}

		, watch   : {
			dev : {
				files   : [ 
						'./src/**/*.html'
					, './src/**/*.js'
					, './src/**/*.json'
					, './src/**/*.xml'
					, './src/**/*.form'
					, './src/**/*.xaml'
					, './src/**/*.css'
					, './libs/**/*.js'
					, './src/**/*.properties'
					, './*.html'
				]
				, options : { livereload: 35730 }
			}
		}

	});

	//load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	//define tasks
	grunt.registerTask('preview', ['connect:dev', 'watch:dev'])
	grunt.registerTask('default', ['preview'])

}