module.exports = {
   mobile: {
        options: {
            baseUrl: "./clientModule",
            mainConfigFile: "./clientModule/mobileHeaderFooterLoader.js",
            name: "mobileHeaderFooterLoader",
            include: [
                "scripts/lib/require"
            ],
            exclude: [],
            optimize: "uglify2",
            out: "./clientModule/build/mobileHeaderFooterLoader-built.js",

        }
    },
    Desktop: {
        options: {
            baseUrl: "./clientModule",
            mainConfigFile: "./clientModule/DesktopHeaderFooterLoader.js",
            name: "DesktopHeaderFooterLoader",
            include: [
                "scripts/lib/require"
            ],
            exclude: [],
            optimize: "uglify2",
            out: "./clientModule/build/DesktopHeaderFooterLoader-built.js",

        }
    }
};