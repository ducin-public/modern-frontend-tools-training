'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    path = require("path");

module.exports = function (grunt) {

    var allowedInlineInstanceOptions = [
        'api',
        'consoleLog',
        'debug'
    ];

    grunt.registerTask('debug-instance', 'display instance debug information', function () {
        grunt.log.subhead('Instance information:');
        grunt.log.writeln("'instance' option: " + grunt.option('instance'));
        grunt.log.writeln("'instanceConfig' option: " + JSON.stringify(grunt.option('instanceConfig')));
        grunt.log.writeln("'instance' config: " + grunt.config.get('instance'));
        grunt.log.writeln("'instanceConfig' config: " + JSON.stringify(grunt.config.get('instanceConfig')));
        grunt.log.writeln();
    });

    // displaying debugging instance output when --verbose option passed in CLI
    function displayDebugInstanceConfiguration(grunt) {
        if (grunt.option('verbose')) {
            grunt.task.run('debug-instance');
        }
    }

    function getInlineOptions() {
        var inlineInstanceOptions = {};
        _.each(allowedInlineInstanceOptions, function (opt) {
            if (grunt.option('instance.' + opt)) {
                inlineInstanceOptions[opt] = grunt.option('instance.' + opt);
            }
        });
        return inlineInstanceOptions;
    }

    grunt.registerTask('inject-config', 'checks whether instance option has been passed correctly', function () {
        displayDebugInstanceConfiguration(grunt);

        var forceInstance = grunt.config('cfg.forceInstance'),
            instance = grunt.option('instance');
        if (!instance) {
            if (forceInstance) {
                grunt.fail.fatal("instance parameter not specified.\n" +
                    "Use --instance=<name>, where config/<name>.json is the application instance configuration file");
            } else {
                instance = 'default';
                grunt.option('instance', instance);
            }
        }

        try {
            var file = '../config/' + instance + '.json',
                filepath = path.join(__dirname, file),
                stats = fs.lstatSync(filepath);
            if (stats.isFile()) {
                var instanceConfig = grunt.file.readJSON(filepath);
                grunt.log.oklns("instance configuration '" + instance + "' loaded from " + file + ":");
                grunt.log.writeln(JSON.stringify(instanceConfig, null, 2));
                // extending instance config with inline options
                var inlineOptions = getInlineOptions(),
                    inlineKeys = _.keys(inlineOptions);
                if (inlineKeys.length) {
                    grunt.log.oklns('recognized inline instance options:');
                    grunt.log.writeln(JSON.stringify(inlineOptions, null, 2));
                    _.extend(instanceConfig, inlineOptions);
                    grunt.log.oklns("setting instance configuration to:");
                    grunt.log.writeln(JSON.stringify(instanceConfig, null, 2));
                } else {
                    grunt.log.oklns('no inline instance options recognized.');
                }
                // updating grunt configuration with instance config
                grunt.config.set('instance', instance);
                grunt.config.set('instanceConfig', instanceConfig);
            }
        } catch (e) {
            grunt.log.writeln(e);
            grunt.fail.fatal("Instance file " + filepath + " doesn't exist.");
        }

        displayDebugInstanceConfiguration(grunt);
    });
};
