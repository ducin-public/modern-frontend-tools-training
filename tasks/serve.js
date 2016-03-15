'use strict';

module.exports = function (grunt) {

    var serveConfig = {
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                base: [
                    '<%= cfg.paths.output %>',
                    '<%= cfg.paths.bower %>'
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
                    '<%= cfg.paths.output %>/**/*'
                ]
            }
        }
    };

    grunt.config.merge(serveConfig);

    var serveTasks = [
        'app',
        'connect',
        'watch'
    ];

    grunt.registerTask('serve', 'serves application in development mode', serveTasks);
};
