export default {
  routes: [
    {
      method: 'GET',
      path: '/specializations',
      handler: 'specialization.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/specializations/:id',
      handler: 'specialization.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/specializations',
      handler: 'specialization.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/specializations/:id',
      handler: 'specialization.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/specializations/:id',
      handler: 'specialization.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
