module.exports = function(grunt) {
    'use strict';
    require('./build/setDefaultEnv')(grunt, '.env');
    var async = require('async');
    var _ = require('lodash');
    var path = require('path');
    //Used to set version for nexus 
    if(grunt.option('buildVersion')!==undefined){
        var buildVersion = grunt.option('buildVersion');
        console.log(buildVersion)
    }

    require('load-grunt-config')(grunt, {
        // path to task.js files, defaults to grunt dir
        configPath: path.join(process.cwd(), 'grunt'),

        // auto grunt.initConfig
        init: true,

        // data passed into config.  Can use with <%= test %>
        data: {
            test: false
        },
        config: {
            buildVersion: buildVersion
        },
        loadGruntTasks: {

            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        }
    });

    grunt.registerTask('replace-text', ['replace']);

    grunt.registerTask('default', ['buildInfo', 'handlebars', 'simplemocha', 'karma', 'nodemon']);
    grunt.registerTask('unitTesting', ['simplemocha', 'karma']);
    grunt.registerTask('start', ['buildInfo','handlebars', 'nodemon']);
    grunt.registerTask('createTemplate', 'Create boiler Template', function(dir) {
        var campaignLen = dir.split("/");

        if (dir === "") {
            grunt.log.error("Please Enter directory path with file name")
        } else if (campaignLen.length === 1) {
            grunt.log.error("Directory name or file name is missing!!")
        } else {
            if (grunt.file.exists("CE/" + dir + ".hbs")) {
                grunt.log.error("File with similar name exists in the directory.")
            } else {
                var directory = "CE/" + dir + ".hbs";
                grunt.config.set('copy.main.dest', directory);
                grunt.task.run('copy');
            }
        }
    });
    grunt.registerTask('nexus-staging', ['clean', 'buildInfo', 'compress', 'nexusDeployer']);
    grunt.registerTask('buildLib', ['requirejs']);
    grunt.registerTask('buildInfo', 'Add build data into html file', function() {
        var date = new Date().toLocaleDateString();
        var time = new Date().toLocaleTimeString();
        var theGitInfo = {};

        //Fill grunt config obj with git commands that will later be executed
        var config = _.merge({
            commands : {
                'local.branch.current.SHA': ['rev-parse', 'HEAD'],
                'local.branch.current.name': ['rev-parse', '--abbrev-ref', 'HEAD']
            }
        }, grunt.config.get('gitinfo'));

        var nestObj = function(theKey, theVal,endVal) {
            var returnObj = {};
            if(endVal !== undefined) {
                returnObj=theVal;
                returnObj[theKey] = endVal ;
            }
            return returnObj;
        };

        //set each git info obj with corresponding value
        var setObject = function(theKey,theValue) {
            var obj = {};
            var theObj = {};
            var currKey;
            var props = theKey;
            var valuearr=theValue;

            for(var i = 0; i<props.length; i++) {
                currKey = props[i];
                obj = nestObj(currKey,theObj,valuearr[i]);
                theObj = obj;
            }
            return theObj;
        };

        var getBuildInfo = function(cmd, callback) {
            var spawnArgs = config.commands[cmd];

            //runs the git commands in a child process
            grunt.util.spawn({
                cmd: 'git',
                args: spawnArgs
            }, function (err, output) {
                if (err) {
                    callback(null,null);
                } else {
                    callback(null, output.stdout);
                }
            });
        };

        //called after async.map is done
        var setBuildInfo = function(err,results) {
            if(results && results !== null && results.length > 0 && results[0] != null) {
                theGitInfo = setObject(["local.branch.current.SHA", "local.branch.current.name"], results);

                //stores the callback results into grunt.config.gitinfo object
                var results = _.defaults(theGitInfo, grunt.config.get('gitinfo'));
                grunt.config.set('gitinfo', results);

                grunt.file.defaultEncoding = 'utf8';
                grunt.file.write('serverModule/expressTemplates/partials/debugInfo.hbs',
                    "<p>Build: " + date + " at: " + time + "</p>"
                    + "<p>SHA: " + theGitInfo['local.branch.current.SHA'] + "</p>"
                    + "<p>Branch: " + theGitInfo['local.branch.current.name'] + "</p>");
                grunt.file.write('serverModule/expressTemplates/partials/debugInfoFooterComment.hbs',
                    "<!-- Build: " + date + " at: " + time + " -->\n"
                    + "<!-- SHA: " + theGitInfo['local.branch.current.SHA']
                    + " -->\n" + "<!-- Branch:" + theGitInfo['local.branch.current.name']
                    + " -->\n");
            }
            else {
                grunt.file.write('serverModule/expressTemplates/partials/debugInfo.hbs',
                    "<p>Build: " + date + " at: " + time + "</p>"
                        + "<p>Could not retrieve Git information.</p>");
                grunt.file.write('serverModule/expressTemplates/partials/debugInfoFooterComment.hbs',
                    "<!-- Build: " + date + " at: " + time + " -->\n"
                    + "<!-- SHA: unavailable -->\n"
                    + "<!-- Branch: unavailable -->\n");
            }
        };

        async.map(_.keys(config.commands),getBuildInfo,setBuildInfo);
    });
};
