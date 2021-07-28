module.exports = {
    devServer:{
        proxy:{
            '/api': {
                target: 'https://www.codeman.store/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}