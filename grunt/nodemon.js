module.exports = {
    dev: {
        script: 'app.js',
        options: {
            callback: function(nodemon) {
                nodemon.on('log', function(event) {
                    console.log(event.colour);
                });
            },
            env: {
                PORT: '8181'
            }
        }
    }
};