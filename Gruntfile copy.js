//*[Grunt file for command line builds](http://gruntjs.com/getting-started)*
var _         = require('lodash'),
    bowerJSON = require('./bower'),
    pack      = require('./package');

module.exports = function(grunt) {
    'use   strict';


    // Sets the default config specified in the .env for runnning grunt tasks without having to set options
    require('./build/setDefaultEnv')(grunt, '.env');

    // Extracts build vars first looking at --option flags then foreman environment vars then defaults to reading .env
    var brand = process.env.BRAND = grunt.option('brand') || process.env.BRAND;
    var env = process.env.ENV = grunt.option('env') || process.env.ENV;
    var buildVersion = process.env.BUILDID = grunt.option('build-version') || process.env.BUILDID;
    process.env.PORT = grunt.option('port') || process.env.PORT;

    // requirejs config to be used by jasmine and requirejs
    var requireSrcPathGenerator = require('./build/requireSrcPathGenerator');

    var bowerPaths = _.extend(bowerJSON.paths, bowerJSON[brand + 'Paths']);

    var bowerFilePaths = {};
    _.each(bowerPaths, function(bowerPath, moduleName) {
        // Backbone 1.1.2 looks for "underscore" library, but we are using lodash, so we must shim lodash as if it were underscore
        if (moduleName === 'underscore') {
            moduleName = 'lodash';
        }
        bowerFilePaths['<%= clientDest %>/scripts/lib/' + moduleName + '.js'] = 'bower_components/' + moduleName + '/' + bowerPath;
    });

    bowerPaths = _.mapValues(bowerPaths, function(modulePath, moduleName) {
        // Backbone 1.1.2 looks for "underscore" library, but we are using lodash, so we must shim lodash as if it were underscore
        if (moduleName === 'underscore') {
            moduleName = 'lodash';
        }
        return 'lib/' + moduleName;
    });

    var generated = requireSrcPathGenerator(grunt, brand);

    var config = {
        configPath: 'grunt',
        tasksPath: 'grunt_tasks',
        init: true,
        config: {
            brand: brand,
            buildVersion: buildVersion,
            version: pack.version,
            env: env,
            shim: bowerJSON.shim,
            paths: _.extend(bowerPaths, generated.paths),
            map: generated.map,
            brandSrc: 'client/' + brand,
            commonSrc: 'client/common',
            clientDest: 'target/' + brand + '/' + env + '/public',
            serverSrc: 'server',
            serverDest: 'target/' + brand + '/' + env,
            testFolder: 'common'
        },
        loadGruntTasks: false,
    };

    // [Automatically Load Grunt Plugin Tasks](https://github.com/firstandthird/load-grunt-config)
    require('load-grunt-config')(grunt, config);

    // Load the non-npm grunt tasks
    grunt.loadTasks(config.tasksPath);

    // Dynamically configure copy:bower target based on contents of bower_components folder
    grunt.config('copy.bower.files', bowerFilePaths);

    // Load all grunt tasks except the jasmine templates
    _.without(require('matchdep')
        .filterDev('grunt-*'), 'grunt-template-jasmine-requirejs', 'grunt-template-jasmine-istanbul')
        .forEach(grunt.loadNpmTasks);



    grunt.registerTask('default', 'build');

    grunt.registerTask('build', 'Builds a development version of the app.', function() {
        grunt.task.run([
            // 'clean:build',
            //'copy:server',
            //'compass:' + (env === 'ci' ? 'dev' : env),
            //'copy:client',
            //'copy:bower',
            //'generate-route-handlers',
            //'handlebars',
            //'requirejsconfig',
        ]);
    });


        // Unit Test Tasks
        grunt.registerTask('test', 'Runs all unit tests', [
            'runmocha',
            'runjasmine:all'
        ]);

        grunt.registerTask('runmocha', 'Runs all mocha tests and lints test files', [
            'copy:servertest',
            'simplemocha:all',
            'jshint:mocha',
            'notify:mocha'
        ]);

        grunt.registerTask('runjasmine', 'Runs all jasmine tests and lints test files', function (target) {
            grunt.task.run([
                'generate-route-handlers',
                'copy:client',
                'copy:bower',
                'requirejsconfig',
                'handlebars:compile',
                'jasmine:' + (target || 'all'),
                'notify:jasmine'
            ]);
        });

}
