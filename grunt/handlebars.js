module.exports = {
    all: {
        files: {
            'clientModule/scripts/template.js': ['clientModule/scripts/templates/**/*.hbs']
        }
    },
    options: {
        namespace: "Templates",
        wrapped: true,
        amd: true,
        processName: function(filePath) {
            return filePath.replace("clientModule/scripts/templates/", "").replace(/\.hbs$/, '');
        }
    }
};