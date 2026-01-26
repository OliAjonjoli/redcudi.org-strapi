import type { Core } from '@strapi/strapi';

export async function runDevSeed(strapi: Core.Strapi) {
  try {
    const [specCount, profCount, professionalCount, staffCount, businessCount] = await Promise.all([
      strapi.entityService.count('api::specialization.specialization'),
      strapi.entityService.count('api::profession.profession'),
      strapi.entityService.count('api::professional.professional'),
      strapi.entityService.count('api::staff-member.staff-member'),
      strapi.entityService.count('api::business.business'),
    ]);

    strapi.log.info(`[SEED COUNTS] specs=${specCount}, profs=${profCount}, professionals=${professionalCount}, staff=${staffCount}, businesses=${businessCount}`);

    // Backfill legacy records that had firstName/lastName before the switch to name
    if (specCount > 0) {
      const legacySpecs = await strapi.entityService.findMany('api::specialization.specialization', {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fields: ['id', 'name'] as any,
        limit: 500,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filters: { name: { $null: true } } as any,
      });
      for (const spec of legacySpecs as Array<{ id: number | string; firstName?: string; lastName?: string; name?: string }>) {
        const name = [spec.firstName, spec.lastName].filter(Boolean).join(' ').trim();
        if (name) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await strapi.entityService.update('api::specialization.specialization', spec.id, {
            data: { name } as any,
          });
        }
      }
      if (legacySpecs && legacySpecs.length) {
        strapi.log.info(`[SEED] Backfilled name for ${legacySpecs.length} specializations`);
      }
    }

    if (profCount > 0) {
      const legacyProfs = await strapi.entityService.findMany('api::profession.profession', {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fields: ['id', 'name'] as any,
        limit: 500,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filters: { name: { $null: true } } as any,
      });
      for (const prof of legacyProfs as Array<{ id: number | string; firstName?: string; lastName?: string; name?: string }>) {
        const name = [prof.firstName, prof.lastName].filter(Boolean).join(' ').trim();
        if (name) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await strapi.entityService.update('api::profession.profession', prof.id, {
            data: { name } as any,
          });
        }
      }
      if (legacyProfs && legacyProfs.length) {
        strapi.log.info(`[SEED] Backfilled name for ${legacyProfs.length} professions`);
      }
    }

    // Helpers
    const PRONOUNS = [
      'elle/elles/ellxs (neutro)',
      'ella (femenino)',
      'él (masculino)'
    ] as const;
    const PRICING = ['free', 'low_cost', 'sliding_scale', 'standard'] as const;

    // Specializations (10)
    const specializationSeed = [
      { name: 'Ginecología', description: 'Diagnóstico y tratamiento de salud reproductiva y ginecológica.' },
      { name: 'Endocrinología', description: 'Trastornos hormonales y del sistema endocrino.' },
      { name: 'Cardiología', description: 'Salud del corazón y sistema cardiovascular.' },
      { name: 'Psicología Clínica', description: 'Atención psicológica y salud mental.' },
      { name: 'Urología', description: 'Salud urinaria y aparato reproductor masculino.' },
      { name: 'Dermatología', description: 'Cuidado de piel, cabello y uñas.' },
      { name: 'Oftalmología', description: 'Salud visual y tratamientos oculares.' },
      { name: 'Otorrinolaringología', description: 'Oído, nariz y garganta.' },
      { name: 'Pediatría', description: 'Atención médica integral para infancia.' },
      { name: 'Nutriología', description: 'Evaluación nutricional y planes alimenticios.' },
    ];

    const specializationIds = new Map<string, string>();
    if (specCount === 0) {
      strapi.log.info('[SEED] Creating 10 medical specializations...');
      for (const spec of specializationSeed) {
        const created = await strapi.entityService.create('api::specialization.specialization', {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: { name: spec.name, description: spec.description, publishedAt: new Date() } as any,
        });
        specializationIds.set(spec.name, String(created.id));
      }
    } else {
      const existing = await strapi.entityService.findMany('api::specialization.specialization', { fields: ['id', 'name'], limit: 200 });
      for (const item of existing as Array<{ id: string | number; name?: string }>) {
        if (item.name) {
          specializationIds.set(item.name, String(item.id));
        }
      }
    }

    // Professions (10) - non-medical
    const professionSeed = [
      { name: 'Abogacía', description: 'Asesoría y representación legal.' },
      { name: 'Contabilidad', description: 'Gestión contable, fiscal y auditoría.' },
      { name: 'Ingeniería de Software', description: 'Desarrollo y arquitectura de sistemas.' },
      { name: 'Trabajo Social', description: 'Apoyo comunitario y bienestar social.' },
      { name: 'Consultoría Empresarial', description: 'Estrategia, procesos y optimización.' },
      { name: 'Diseño Gráfico', description: 'Branding, identidad y comunicación visual.' },
      { name: 'Recursos Humanos', description: 'Gestión de talento y desarrollo organizacional.' },
      { name: 'Educación', description: 'Formación, enseñanza y capacitación.' },
      { name: 'Comunicación', description: 'Estrategia y gestión de medios.' },
      { name: 'Gestión Administrativa', description: 'Trámites, operaciones y soporte administrativo.' },
    ];

    const professionIds = new Map<string, string>();
    if (profCount === 0) {
      strapi.log.info('[SEED] Creating 10 professions...');
      for (const prof of professionSeed) {
        const created = await strapi.entityService.create('api::profession.profession', {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: { name: prof.name, description: prof.description, publishedAt: new Date() } as any,
        });
        professionIds.set(prof.name, String(created.id));
      }
    } else {
      const existing = await strapi.entityService.findMany('api::profession.profession', { fields: ['id', 'name'], limit: 200 });
      for (const item of existing as Array<{ id: string | number; name?: string }>) {
        if (item.name) {
          professionIds.set(item.name, String(item.id));
        }
      }
    }

    // Staff Members (4)
    if (staffCount === 0) {
      strapi.log.info('[SEED] Creating 4 staff members...');
      const staffMembers = [
        { firstName: 'Sofía', lastName: 'Rodríguez', role: 'Dirección', pronoun: PRONOUNS[1], order: 1 },
        { firstName: 'Juan', lastName: 'Méndez', role: 'Contenido', pronoun: PRONOUNS[2], order: 2 },
        { firstName: 'Diana', lastName: 'Flores', role: 'Alianzas', pronoun: PRONOUNS[0], order: 3 },
        { firstName: 'Alex', lastName: 'Rivera', role: 'Comunidad', pronoun: PRONOUNS[0], order: 4 },
      ];
      for (const s of staffMembers) {
        await strapi.entityService.create('api::staff-member.staff-member', {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: {
            firstName: s.firstName,
            lastName: s.lastName,
            role: s.role,
            pronouns: [{ value: s.pronoun }],
            bio: `Bio de ${s.firstName} ${s.lastName}`,
            order: s.order,
            publishedAt: new Date(),
          } as any,
        });
      }
      strapi.log.info('[SEED] Created 4 staff members');
    }

    // Businesses (10)
    if (businessCount === 0) {
      strapi.log.info('[SEED] Creating 10 businesses...');
      const businesses = [
        { name: 'Bufete Inclusivo Rivera & Asociados', specializations: [], city: 'CDMX' },
        { name: 'Contadores Aliados Diversos', specializations: [], city: 'Guadalajara' },
        { name: 'Consultoría Prisma', specializations: [], city: 'Monterrey' },
        { name: 'Proveedores Arcoíris de IT', specializations: [], city: 'CDMX' },
        { name: 'Clínica Inclusiva Armonía', specializations: ['Psicología Clínica', 'Nutriología'], city: 'Guadalajara' },
        { name: 'Centro Endocrino Vital', specializations: ['Endocrinología'], city: 'Monterrey' },
        { name: 'Despacho Legal Equidad', specializations: [], city: 'CDMX' },
        { name: 'Studio Gráfico Colores', specializations: [], city: 'Guadalajara' },
        { name: 'Talento Humano Abierto', specializations: [], city: 'Monterrey' },
        { name: 'Gestoría Documental Segura', specializations: [], city: 'CDMX' },
      ];

      for (const biz of businesses) {
        const state = biz.city === 'CDMX' ? 'CDMX' : biz.city === 'Guadalajara' ? 'Jalisco' : 'Nuevo León';
        const pricing = PRICING[Math.floor(Math.random() * PRICING.length)];
        const specIds = biz.specializations
          .map((spec) => specializationIds.get(spec))
          .filter((id): id is string => Boolean(id));

        await strapi.entityService.create('api::business.business', {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: {
            name: biz.name,
            specializations: specIds,
            bio: `${biz.name} - Servicios con enfoque inclusivo para la comunidad LGBTQ+.`,
            lgbtq_friendly_statement: 'Compromiso con espacios seguros, inclusivos y respetuosos.',
            services: [
              { name: 'Atención', description: 'Servicios especializados según el giro.' },
              { name: 'Acompañamiento', description: 'Seguimiento y soporte continuo.' },
            ],
            location_city: biz.city,
            location_state: state,
            contact_email: `org${Math.random().toString(36).substring(7)}@redcudi.org`,
            pricing_model: pricing,
            verified: Math.random() > 0.2,
            featured: Math.random() > 0.5,
            publishedAt: new Date(),
          } as any,
        });
      }
    }

    // Professionals (10 medics + 10 other)
    if (professionalCount === 0) {
      strapi.log.info('[SEED] Creating 20 professionals (10 medics, 10 other)...');

      const healthProfessionals = [
        { firstName: 'María', lastName: 'González', title: 'Dr.', specialization: 'Ginecología' },
        { firstName: 'Carlos', lastName: 'Rodríguez', title: 'Dr.', specialization: 'Endocrinología' },
        { firstName: 'Laura', lastName: 'Martínez', title: 'Dr.', specialization: 'Cardiología' },
        { firstName: 'Ana', lastName: 'López', title: 'Psic.', specialization: 'Psicología Clínica' },
        { firstName: 'Roberto', lastName: 'Pérez', title: 'Dr.', specialization: 'Urología' },
        { firstName: 'Fernanda', lastName: 'Díaz', title: 'Dr.', specialization: 'Dermatología' },
        { firstName: 'José', lastName: 'García', title: 'Dr.', specialization: 'Oftalmología' },
        { firstName: 'Sofía', lastName: 'Ruiz', title: 'Dr.', specialization: 'Otorrinolaringología' },
        { firstName: 'Miguel', lastName: 'Flores', title: 'Dr.', specialization: 'Pediatría' },
        { firstName: 'Patricia', lastName: 'Sánchez', title: 'Dr.', specialization: 'Nutriología' },
      ];

      const otherProfessionals = [
        { firstName: 'Juan', lastName: 'Mendoza', title: 'Lic.', profession: 'Abogacía' },
        { firstName: 'Carla', lastName: 'Núñez', title: 'C.P.', profession: 'Contabilidad' },
        { firstName: 'David', lastName: 'Morales', title: 'Ing.', profession: 'Ingeniería de Software' },
        { firstName: 'Elena', lastName: 'Vega', title: 'Lic.', profession: 'Trabajo Social' },
        { firstName: 'Francisco', lastName: 'Herrera', title: 'Lic.', profession: 'Consultoría Empresarial' },
        { firstName: 'Lucía', lastName: 'Campos', title: 'Lic.', profession: 'Diseño Gráfico' },
        { firstName: 'Andrés', lastName: 'Salinas', title: 'Lic.', profession: 'Recursos Humanos' },
        { firstName: 'Valeria', lastName: 'Torres', title: 'Lic.', profession: 'Educación' },
        { firstName: 'Ricardo', lastName: 'Pineda', title: 'Lic.', profession: 'Comunicación' },
        { firstName: 'Mariana', lastName: 'Álvarez', title: 'Lic.', profession: 'Gestión Administrativa' },
      ];

      const cityPool = ['CDMX', 'Guadalajara', 'Monterrey'];
      const createdIds: string[] = [];

      for (const prof of healthProfessionals) {
        const city = cityPool[Math.floor(Math.random() * cityPool.length)];
        const state = city === 'CDMX' ? 'CDMX' : city === 'Guadalajara' ? 'Jalisco' : 'Nuevo León';
        const pricing = PRICING[Math.floor(Math.random() * PRICING.length)];
        const specId = prof.specialization ? specializationIds.get(prof.specialization) : undefined;

        const dataToCreate: any = {
          firstName: prof.firstName,
          lastName: prof.lastName,
          title: prof.title,
          entity_type: 'individual_health',
          pronouns: [{ value: PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)] }],
          bio: `Especialista en ${prof.specialization} con enfoque inclusivo y atención integral.`,
          lgbtq_friendly_statement: 'Atención respetuosa, inclusiva y libre de discriminación.',
          services: [
            { name: 'Consulta', description: 'Evaluación y diagnóstico inicial.' },
            { name: 'Seguimiento', description: 'Acompañamiento continuo.' },
          ],
          location_city: city,
          location_state: state,
          contact_email: `${prof.firstName.toLowerCase()}.${prof.lastName.toLowerCase()}@medicos.redcudi.org`,
          pricing_model: pricing,
          verified: Math.random() > 0.3,
          featured: Math.random() > 0.5,
          publishedAt: new Date(),
        };

        if (specId) {
          dataToCreate.specializations = [specId];
        }

        const created = await strapi.entityService.create('api::professional.professional', { data: dataToCreate });
        createdIds.push(String(created.id));
      }

      for (const prof of otherProfessionals) {
        const city = cityPool[Math.floor(Math.random() * cityPool.length)];
        const state = city === 'CDMX' ? 'CDMX' : city === 'Guadalajara' ? 'Jalisco' : 'Nuevo León';
        const pricing = PRICING[Math.floor(Math.random() * PRICING.length)];
        const professionId = professionIds.get(prof.profession);

        const dataToCreate: any = {
          firstName: prof.firstName,
          lastName: prof.lastName,
          title: prof.title,
          entity_type: 'individual_other',
          pronouns: [{ value: PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)] }],
          bio: `Profesional en ${prof.profession} con servicios centrados en inclusión y respeto.`,
          lgbtq_friendly_statement: 'Espacio seguro y acogedor para la comunidad LGBTQ+.',
          services: [
            { name: 'Consulta', description: 'Asesoría profesional personalizada.' },
            { name: 'Acompañamiento', description: 'Soporte en procesos y trámites.' },
          ],
          location_city: city,
          location_state: state,
          contact_email: `${prof.firstName.toLowerCase()}.${prof.lastName.toLowerCase()}@profesionales.redcudi.org`,
          pricing_model: pricing,
          verified: Math.random() > 0.3,
          featured: Math.random() > 0.5,
          publishedAt: new Date(),
        };

        if (professionId) {
          dataToCreate.professions = [professionId];
        }

        const created = await strapi.entityService.create('api::professional.professional', { data: dataToCreate });
        createdIds.push(String(created.id));
      }

      strapi.log.info(`[SEED] Created ${createdIds.length} professionals`);
    }

    strapi.log.info('[SEED] All seed operations completed successfully!');
  } catch (error) {
    strapi.log.error('[SEED ERROR]', error);
    throw error;
  }
}
