module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['serve']);
    grunt.task.loadTasks('tasks');
};
