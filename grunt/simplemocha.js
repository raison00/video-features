module.exports = {
    options: {
        globals: ['expect'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
    },
    all: {
        src: ['serverModule/test/*.js']
    }
};