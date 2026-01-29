module.exports = {
  async find(ctx) {
    const states = await strapi.entityService.findMany('api::state.state', {
      populate: 'cities',
    });
    ctx.send(states);
  },
  
  async findOne(ctx) {
    const { id } = ctx.params;
    const state = await strapi.entityService.findOne('api::state.state', id, {
      populate: 'cities',
    });
    ctx.send(state);
  },
};
