'use strict';

module.exports = function (grunt) {

    var appConfig = {
        clean: {
            output: '<%= cfg.paths.output %>',
            options: {
                force: true
            }
        },
        copy: {
            css: {
                src: '<%= cfg.paths.source %>/jumbotron.css',
                dest: '<%= cfg.paths.output %>/jumbotron.css'
            }
        },
        concat: {
            polyfills: {
                src: '<%= cfg.paths.source %>/array.find.js',
                dest: '<%= cfg.paths.output %>/polyfills.js'
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
                src: '<%= cfg.paths.source %>/index.jade',
                dest: '<%= cfg.paths.output %>/index.html'
            }
        },
        watch: {
            index: {
                files: ['<%= cfg.paths.source %>/index.jade'],
                tasks: ['jade']
            }
        }
    };

    grunt.config.merge(appConfig);

    var appTasks = [
        'inject-config',
        'clean',
        'copy',
        'concat',
        'jade'
    ];

    grunt.registerTask('app', 'compile application (prepare temporary files)', appTasks);
};
