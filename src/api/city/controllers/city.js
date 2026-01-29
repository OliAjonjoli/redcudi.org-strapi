module.exports = {
  async find(ctx) {
    const cities = await strapi.entityService.findMany('api::city.city', {
      populate: 'state',
    });
    ctx.send(cities);
  },
  
  async findOne(ctx) {
    const { id } = ctx.params;
    const city = await strapi.entityService.findOne('api::city.city', id, {
      populate: 'state',
    });
    ctx.send(city);
  },
};
