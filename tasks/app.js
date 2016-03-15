'use strict';

module.exports = function (grunt) {

    var appConfig = {
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
        watch: {
            index: {
                files: ['src/index.jade'],
                tasks: ['jade']
            }
        }
    };

    grunt.config.merge(appConfig);

    var appTasks = [
        'clean',
        'copy',
        'concat',
        'jade'
    ];

    grunt.registerTask('app', 'compile application (prepare temporary files)', appTasks);
};
