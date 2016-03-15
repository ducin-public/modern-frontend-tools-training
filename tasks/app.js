'use strict';

module.exports = function (grunt) {

    var appConfig = {
        clean: {
            output: '<%= cfg.paths.output %>',
            options: {
                force: true
            }
        },
        concat: {
            polyfills: {
                src: '<%= cfg.paths.source %>/array.find.js',
                dest: '<%= cfg.paths.output %>/polyfills.js'
            }
        },
        sass: {
            output: {
                options: {
                    sourceMap: true
                },
                files: {
                    '<%= cfg.paths.output %>/bootstrap.css': '<%= cfg.paths.source %>/styles/<%= instanceConfig.styles %>.scss'
                }
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
            'jade:index': {
                files: ['<%= cfg.paths.source %>/index.jade'],
                tasks: ['jade']
            },
            'sass:output': {
                files: ['<%= cfg.paths.source %>/styles/**/*'],
                tasks: ['inject-config', 'sass']
            }
        }
    };

    grunt.config.merge(appConfig);

    var appTasks = [
        'inject-config',
        'clean',
        'sass',
        'concat',
        'jade'
    ];

    grunt.registerTask('app', 'compile application (prepare temporary files)', appTasks);
};
