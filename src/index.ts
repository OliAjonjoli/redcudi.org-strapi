import type { Core } from '@strapi/strapi';
import { runDevSeed } from './seed/devSeed';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Create admin user if none exists
    try {
      const adminCount = await strapi.entityService.count('admin::user');
      if (adminCount === 0) {
        strapi.log.info('[BOOTSTRAP] Creating default admin user...');
        
        // Find Super Admin role
        const superAdminRole = await strapi.query('admin::role').findOne({
          where: { code: 'strapi-super-admin' },
        });

        if (!superAdminRole) {
          strapi.log.error('[BOOTSTRAP] Super Admin role not found');
          return;
        }

        await strapi.service('admin::user').create({
          firstName: 'Olivia',
          lastName: 'Merinos',
          email: 'olivia.merinos@outlook.com',
          password: 'Mummy-Undertake6-Defy',
          isActive: true,
          roles: [superAdminRole.id],
        });
        strapi.log.info('[BOOTSTRAP] Admin user created successfully with Super Admin role');
      }
    } catch (error) {
      strapi.log.warn('[BOOTSTRAP] Error creating admin user:', error);
    }

    strapi.log.info(`[SEED DEBUG] SEED_DEV=${process.env.SEED_DEV}, NODE_ENV=${process.env.NODE_ENV}`);
    const seedEnabled = process.env.SEED_DEV === 'true' && process.env.NODE_ENV !== 'production';
    if (!seedEnabled) {
      strapi.log.info('[SEED] Dev seed skipped - check SEED_DEV and NODE_ENV');
      return;
    }

    strapi.log.info('[SEED] Starting dev seed...');
    await runDevSeed(strapi);
    strapi.log.info('[SEED] Bootstrap seed completed');
  },
};
