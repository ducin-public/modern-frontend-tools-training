module.exports = function(grunt) {

    grunt.initConfig({
        connect: {
            options: {
                port: 9002,
                base: [
                    'src',
                    'bower_components'
                ]
            },
            server: {
                options: {
                    open: true,
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', [
        'connect'
    ]);

    grunt.registerTask('default', ['build']);
};
