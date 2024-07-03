module.exports = () => {
  return async (ctx, next) => {
    try {
      const token = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx)
      if (token) {
        const { id } = token;
        const user = await strapi.service('plugin::users-permissions.user').fetchAuthenticatedUser(id);
        ctx.state.user = user;
      }
    } catch (error) {
      strapi.log.error(`Plugin upload-permission :::: ${error}`);
    }
    const pluginConfig = strapi.config.get('plugin.upload-permission');
    if (pluginConfig && pluginConfig.downloadCallback) {
      return pluginConfig.downloadCallback(ctx, next);
    }
    await next();
  };
};
