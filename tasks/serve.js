'use strict';

module.exports = function (grunt) {

    var serveConfig = {
        clean: {
            output: 'dist',
            options: {
                force: true
            }
        },
        copy: {
            css: {
                src: 'src/jumbotron.css',
                dest: 'dist/jumbotron.css'
            }
        },
        concat: {
            polyfills: {
                src: 'src/array.find.js',
                dest: 'dist/polyfills.js'
            }
        },
        jade: {
            options: {
                client: false,
                pretty: true,
                data: function () {
                    return {
                        version: grunt.config.get('pkg.version'),
                        author: grunt.config.get('pkg.author'),
                        description: grunt.config.get('pkg.description'),
                        name: grunt.config.get('instanceConfig.name'),
                        title: grunt.config.get('instanceConfig.title'),
                        datetime: new Date().toLocaleString()
                    };
                }
            },
            index: {
                src: 'src/index.jade',
                dest: 'dist/index.html'
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                base: [
                    'dist',
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
                    'dist/**/*'
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
        'clean',
        'copy',
        'concat',
        'jade',
        'connect',
        'watch'
    ];

    grunt.registerTask('serve', 'serves application in development mode', serveTasks);
};
