module.exports = {
    main: {
        options: {
            archive: 'CE.zip'
        },
        files: [{
            expand: true,
            dot: true,
            cwd: './',
            src: ["**/**","**.**","!node_modules/**","!.git/**","!.gitignore","!.gitreview"],
            dest: 'CEmcom/src/'
        }, {
            expand: true,
            dot: true,
            cwd: 'CE_envconfigs/CEmcom/',
            src: ['**'],
            dest: 'CEmcom/config/'
        }]
    }
};