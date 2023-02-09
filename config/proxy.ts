/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:3333/api/v1/',
      changeOrigin: true,
      'pathRewrite': { '^/api/v1': '' },
    },
    '/driver-monitoring/': {
      target: 'rtmp://localhost:3336/driver-monitoring/'
    }
  },
  test: {
    '/api/': {
      target: 'http://localhost:3333/api/v1/',
      changeOrigin: true,
      pathRewrite: { '^/api/v1': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'http://localhost:3333/api/v1/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
