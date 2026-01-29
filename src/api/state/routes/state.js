module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/states',
      handler: 'state.find',
    },
    {
      method: 'GET',
      path: '/states/:id',
      handler: 'state.findOne',
    },
  ],
};
