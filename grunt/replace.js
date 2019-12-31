/**
 * Created by m252924 on 8/15/17.
 */


module.exports={
    replace: {
            src: [
                'ce/**/*.css', 'ce/**/*.js', 'ce/**/*.hbs', 'ce/**/*.html'
            ],
            overwrite: true,
            replacements: [ {
                from: /((http|https|ftp):\/\/)?(www)?(assets)?\.mcomexternal\d{1,4}\.fds\.com/g,  //write our regex pattern here
                to: function () {
                    return "http://www.macys.com";
                }
            }]
        },


};
