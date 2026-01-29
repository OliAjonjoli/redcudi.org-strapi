module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/cities',
      handler: 'city.find',
    },
    {
      method: 'GET',
      path: '/cities/:id',
      handler: 'city.findOne',
    },
  ],
};
