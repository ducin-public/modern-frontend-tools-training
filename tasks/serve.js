'use strict';

module.exports = function (grunt) {

    var serveConfig = {
        concat: {
            polyfills: {
                src: 'src/array.find.js',
                dest: 'src/polyfills.js'
            }
        },
        jade: {
            options: {
                client: false,
                pretty: true,
                data: function () {
                    return {
                        version: grunt.config.get('pkg.version'),
                        name: grunt.config.get('instanceConfig.name'),
                        title: grunt.config.get('instanceConfig.title'),
                        datetime: new Date().toLocaleString()
                    };
                }
            },
            index: {
                src: 'src/index.jade',
                dest: 'src/index.html'
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
                files: ['src/index.jade'],
                tasks: ['jade']
            }
        }
    };

    grunt.config.merge(serveConfig);

    var serveTasks = [
        'jade',
        'connect',
        'watch'
    ];

    grunt.registerTask('serve', 'serves application in development mode', serveTasks);
};
