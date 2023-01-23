module.exports = () => {
  return {
    initialize() {
      strapi.router.get('/', (ctx) => {
        ctx.redirect(strapi.config.get('server.admin.url', '/admin/auth/login'))
      })
    },
  };
};
