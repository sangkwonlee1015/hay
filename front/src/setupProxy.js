const { createPoxyMiddleware, createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://k7a603.p.ssafy.io:8080',
      changeOrigin: true,
    })
  );
};