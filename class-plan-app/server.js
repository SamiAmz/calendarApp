const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

app.use(cors());

// Proxy requests to DeepSeek's API
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.deepseek.com',
    changeOrigin: true,
    pathRewrite: { '^/': '' }, // Remove /api prefix
    headers: {
      Authorization: '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',
    },
  })
);

app.listen(5000, () => {
  console.log('Proxy server running on http://localhost:5000');
});