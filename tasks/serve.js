'use strict';

module.exports = function (grunt) {

    var serveConfig = {
        concat: {
            polyfills: {
                src: 'src/array.find.js',
                dest: 'src/polyfills.js'
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                base: [
                    'src',
                    'bower_components'
                ]
            },
            server: {
                options: {
                    open: true,
                    livereload: 8999
                }
            }
        },
        watch: {
            options: {
                livereload: 8999
                // processes are spawned by default (unspawned grunt fails often)
            },
            livereload: {
                files: [
                    'src/**/*'
                ]
            },
            'index': {
                files: ['src/index.html'],
                tasks: [] // nothing to do here
            }
        }
    };

    grunt.config.merge(serveConfig);

    var serveTasks = [
        'connect',
        'watch'
    ];

    grunt.registerTask('serve', 'serves application in development mode', serveTasks);
};
