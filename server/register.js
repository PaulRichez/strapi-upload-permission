'use strict';
const range = require('koa-range');
const koaStatic = require('koa-static');
module.exports = ({ strapi }) => {
  // register phase
  const pluginConfig = strapi.config.get('plugin.upload-permission');
  if (pluginConfig === undefined) return;
  const contentManagerVisible = pluginConfig['content-manager-visible'];
  const contentTypeBuilderVisible = pluginConfig['content-type-builder'];
  if (contentManagerVisible) {
    // file - folder visibility
    ['content-manager', 'content-type-builder'].forEach(contentType => {
      ['file', 'folder'].forEach(modelName => {
        const valueContentManagerFromConfig = contentManagerVisible[modelName];
        const valueContentTypeBuilderFromConfig = contentTypeBuilderVisible[modelName];
        const value = contentType === 'content-manager' ? valueContentManagerFromConfig : valueContentTypeBuilderFromConfig;
        if (value && strapi.plugins['upload'].contentTypes[modelName]) {
          strapi.log.info(`Plugin upload-permission :::: Setting visibility [${contentType}] of ${modelName} to ${value}`);
          strapi.plugins['upload'].contentTypes[modelName]['pluginOptions'][contentType] = {
            visible: value
          };
        }
      });
    });
  }


  const localServerConfig = strapi.config.get('plugin.upload.providerOptions.localServer', {});
  strapi.server.routes([
    {
      method: 'GET',
      path: '/uploads/(.*)',
      handler: [range, koaStatic(strapi.dirs.public ? strapi.dirs.public : strapi.dirs.static.public, { defer: true, ...localServerConfig })],
      config: {
        middlewares: [
          "plugin::upload-permission.uploadPermission"
        ],
        auth: false,
      },
    },
  ]);
}
