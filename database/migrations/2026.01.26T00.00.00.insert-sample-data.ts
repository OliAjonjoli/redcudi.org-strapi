'use strict';

/**
 * Sample data migration for redcudi.org content types
 */
module.exports = {
  async up(knex) {
    // Insert sample professions
    const professions = await knex('professions').insert([
      {
        name: 'Psicología',
        slug: 'psicologia',
        description: '<p>Profesionales en psicología clínica y terapia especializada para la comunidad LGBTQ+</p>',
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Medicina General',
        slug: 'medicina-general',
        description: '<p>Médicos generales y especialistas médicos LGBTQ+ friendly</p>',
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Endocrinología',
        slug: 'endocrinologia',
        description: '<p>Especialistas en endocrinología para tratamientos hormonales seguros y supervisados</p>',
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Cirugía',
        slug: 'cirugia',
        description: '<p>Profesionales quirúrgicos con experiencia en procedimientos afirmativos</p>',
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
    ]);

    // Insert sample specializations
    const specializations = await knex('specializations').insert([
      {
        name: 'Terapia Hormonal',
        slug: 'terapia-hormonal',
        description: '<p>Especialización en terapia hormonal para personas trans y no binarias</p>',
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Salud Mental',
        slug: 'salud-mental',
        description: '<p>Apoyo emocional y terapéutico especializado en identidad de género</p>',
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Procedimientos Afirmativos',
        slug: 'procedimientos-afirmativos',
        description: '<p>Intervenciones quirúrgicas y procedimientos médicos de afirmación de género</p>',
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Salud Sexual',
        slug: 'salud-sexual',
        description: '<p>Atención especializada en salud sexual y reproductiva</p>',
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
    ]);

    // Insert sample professionals
    const professionals = await knex('professionals').insert([
      {
        name: 'Dra. María López',
        slug: 'dra-maria-lopez',
        entity_type: 'individual_health',
        bio: '<p>Psicóloga clínica con más de 10 años de experiencia en salud mental LGBTQ+. Especializada en terapia afirmativa de género y acompañamiento durante procesos de transición.</p>',
        lgbtq_friendly_statement: '<p>Mi consultorio es un espacio seguro y acogedor donde respetamos la identidad de cada persona. Utilizo un enfoque de terapia afirmativa centrado en la persona.</p>',
        location_city: 'Buenos Aires',
        location_state: 'Buenos Aires',
        contact_email: 'maria.lopez@example.com',
        contact_phone: '+54 11 1234-5678',
        contact_whatsapp: '+54 11 1234-5678',
        website: 'https://example.com/maria-lopez',
        pricing_model: 'sliding_scale',
        verified: true,
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Dr. Carlos González',
        slug: 'dr-carlos-gonzalez',
        entity_type: 'individual_health',
        bio: '<p>Endocrinólogo especializado en terapia hormonal para personas trans. Protocolo seguro y monitoreo constante de salud.</p>',
        lgbtq_friendly_statement: '<p>Creo en la autonomía corporal y el derecho a acceder a tratamientos hormonales seguros. Mi práctica está fundamentada en evidencia científica y respeto.</p>',
        location_city: 'CDMX',
        location_state: 'Ciudad de México',
        contact_email: 'carlos.gonzalez@example.com',
        contact_phone: '+52 55 8765-4321',
        website: 'https://example.com/carlos-gonzalez',
        pricing_model: 'standard',
        verified: true,
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Centro de Salud Integral LGBTQ+',
        slug: 'centro-salud-integral-lgbtq',
        entity_type: 'organization',
        bio: '<p>Centro de salud multidisciplinario dedicado a atender las necesidades de la comunidad LGBTQ+. Contamos con equipo de psicólogos, médicos y enfermeras especializadas.</p>',
        lgbtq_friendly_statement: '<p>Nuestro centro fue creado por y para la comunidad LGBTQ+. Garantizamos atención segura, confidencial y sin discriminación.</p>',
        location_city: 'Lima',
        location_state: 'Lima',
        contact_email: 'contacto@centrolgtbq.org',
        contact_phone: '+51 1 5555-5555',
        website: 'https://centrolgtbq.org',
        pricing_model: 'low_cost',
        verified: true,
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Dra. Alejandra Martínez',
        slug: 'dra-alejandra-martinez',
        entity_type: 'individual_health',
        bio: '<p>Cirujana especializada en procedimientos de afirmación de género con más de 8 años de experiencia. Sigo los estándares internacionales WPATH.</p>',
        lgbtq_friendly_statement: '<p>Creo que cada persona merece acceso a procedimientos seguros y de calidad. Mi enfoque es centrado en el bienestar integral de mis pacientes.</p>',
        location_city: 'Bogotá',
        location_state: 'Cundinamarca',
        contact_email: 'alejandra.martinez@example.com',
        contact_phone: '+57 1 3000-0000',
        website: 'https://example.com/alejandra-martinez',
        pricing_model: 'standard',
        verified: true,
        featured: false,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
    ]);

    // Insert sample staff members
    await knex('staff_members').insert([
      {
        name: 'Sofia Rodríguez',
        slug: 'sofia-rodriguez',
        role: 'Directora Ejecutiva',
        bio: '<p>Activista trans con más de 15 años de experiencia en derechos LGBTQ+. Fundadora de redcudi.org.</p>',
        order: 1,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Juan Mendez',
        slug: 'juan-mendez',
        role: 'Coordinador de Contenidos',
        bio: '<p>Especialista en comunicación digital y estrategia comunitaria. Encargado de mantener la plataforma actualizada y accesible.</p>',
        order: 2,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
      {
        name: 'Diana Flores',
        slug: 'diana-flores',
        role: 'Responsable de Alianzas',
        bio: '<p>Trabaja en la construcción de alianzas con profesionales de salud y organizaciones LGBTQ+.</p>',
        order: 3,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      },
    ]);

    console.log('Sample data inserted successfully');
  },

  async down(knex) {
    // Truncate tables in reverse order of insertion
    await knex('staff_members').del();
    await knex('professionals_profession__profession_professionals').del();
    await knex('professionals_specialization__specialization_professionals').del();
    await knex('professionals').del();
    await knex('specializations').del();
    await knex('professions').del();

    console.log('Sample data removed successfully');
  },
};
