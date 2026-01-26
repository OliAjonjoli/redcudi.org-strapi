export default {
  async beforeCreate(event) {
    const { data } = event.params;
    
    if (data.firstName && data.lastName && !data.slug) {
      // Generate slug from firstName-lastName
      const slug = `${data.firstName}-${data.lastName}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
      
      data.slug = slug;
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;
    
    if (data.firstName && data.lastName) {
      // Regenerate slug from firstName-lastName
      const slug = `${data.firstName}-${data.lastName}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
      
      data.slug = slug;
    }
  },
};
