module.exports = {
    baseUrl: './',
    configureWebpack: {
        output: {
            library: "VueGridLayout",
            libraryExport: 'default'
        },
    },
    css: {
        extract: false
    }
}