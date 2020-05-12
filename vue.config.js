module.exports = {
  devServer: {
    before: app => {
      app.get(/^\/(upload|cover|avatar)/, (req, res) => {
        return res.redirect('http://localhost:3000' + req.originalUrl)
      })
    },
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        ws: true,
      },
      '/static': {
        target: 'http://localhost:3000',
      },
    },
  },
}
