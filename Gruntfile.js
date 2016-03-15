module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cfg: {
            paths: {
                root: __dirname,
                source: '<%= cfg.paths.root %>/src',
                output: '<%= cfg.paths.root %>/dist',
                bower: '<%= cfg.paths.root %>/bower_components'
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['serve']);
    grunt.task.loadTasks('tasks');
};
