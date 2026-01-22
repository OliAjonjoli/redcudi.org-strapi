# 🚀 redcudi.org - Strapi Backend

Strapi headless CMS backend for the **redcudi.org** nonprofit organization (LGBTQ+ community focused on trans community).

## 📋 Content Types Overview

### Collections

#### **Professional** (Consolidated)
Central collection for all professionals, health specialists, and organizations in the directory.

**Fields:**
- `name` - Professional/organization name (required)
- `slug` - URL-friendly identifier (auto-generated)
- `entity_type` - Type discriminator (required):
  - `individual_health` - Health professionals (doctors, therapists, etc.)
  - `individual_other` - Non-health professionals (lawyers, accountants, etc.)
  - `organization` - Organizations and businesses
- `pronouns` - Repeatable component with standard/custom pronoun options
- `photo` - Profile image
- `bio` - Rich text biography
- `lgbtq_friendly_statement` - LGBTQ+ friendly statement (rich text)
- `services` - Repeatable service items (name + description)
- `location_city` - City location
- `location_state` - State/region
- `contact_email` - Email contact
- `contact_phone` - Phone number
- `contact_whatsapp` - WhatsApp number
- `website` - Professional website URL
- `social_media` - Component with social links
- `pricing_model` - Enumeration: free | low_cost | sliding_scale | standard
- `verified` - Boolean verification status
- `featured` - Boolean for directory highlighting
- `specializations` - Relation to Specializations (many-to-many)
- `professions` - Relation to Professions (many-to-many)

#### **Specialization**
Health specializations/categories (psychology, gynecology, endocrinology, etc.)

**Fields:**
- `name` - Specialization name (required)
- `slug` - URL-friendly identifier
- `description` - Rich text description
- `icon` - Icon image
- `professionals` - Relation to Professionals (many-to-many)

#### **Profession**
Non-health professional categories (law, accounting, engineering, etc.)

**Fields:**
- `name` - Profession name (required)
- `slug` - URL-friendly identifier
- `description` - Rich text description
- `icon` - Icon image
- `professionals` - Relation to Professionals (many-to-many)

#### **Staff Member**
Team/organization staff members.

**Fields:**
- `name` - Staff member name
- `slug` - URL-friendly identifier
- `role` - Position/role title
- `pronouns` - Repeatable pronoun component
- `photo` - Profile image
- `bio` - Rich text biography
- `social_media` - Social links component
- `order` - Integer for display ordering

### Components

#### **pronoun** (`shared.pronoun`)
Inclusive pronoun selector with predefined Spanish options + custom fallback.
- `value` - Enumeration: ella (femenino) | él (masculino) | elle/elles/ellxs (neutro)
- `custom_value` - String for non-standard pronouns

#### **service-item** (`shared.service-item`)
Individual service offered by a professional.
- `name` - Service name
- `description` - Rich text service details

#### **social-links** (`shared.social-links`)
Social media and web presence links.
- `facebook`, `instagram`, `twitter`, `tiktok`, `linkedin`, `website`
- `youtube`, `bluesky`, `threads` - Added modern platforms
- `email` - Contact email

#### **timeline-item** (`shared.timeline-item`)
Historical milestones and events.
- `title` - Event title (required)
- `description` - Rich text event description
- `date` - Event date (required)
- `order` - Integer for chronological ordering

#### **value-item** (`shared.value-item`)
Organization core values.
- `title` - Value name (required)
- `description` - Rich text value description
- `icon` - Icon/image representation
- `order` - Integer for display ordering

## 🚀 Quick Start

### `develop`

Start your Strapi application with autoReload enabled.

```
npm run develop
```

### `start`

Start your Strapi application with autoReload disabled.

```
npm run start
```

### `build`

Build your admin panel.

```
npm run build
```

## 🏗️ Architecture

### Consolidated Professional Collection
The `professional` collection consolidates what was previously two separate collections (`health-professional` and `professional`) into a single, flexible collection using a **type discriminator pattern**. This allows:

- **Single data model** for all directory entries
- **Easy filtering** by entity type (health pros, other professionals, organizations)
- **Flexible relationships** with both specializations and professions
- **Scalability** for future professional categories

### Relationships

```
Professional --[many-to-many]--> Specialization
Professional --[many-to-many]--> Profession
```

This allows professionals to have multiple specializations and professions, and enables:
- Health professionals tagged with multiple health specializations
- Organizations offering multiple types of services
- Easy cross-referencing for discovery

## 📦 Deployment

The project will be containerized and published to GitHub Container Registry (GHCR) for production deployments. See `Dockerfile` and deployment documentation for details.

## 🔗 Integration

This Strapi instance is consumed by the **Astro frontend** (`redcudi.org-astro`) via REST API for:
- Rendering professional directory listings
- Dynamic detail pages for each professional
- Filtered search by specialization/profession
- Static content generation at build time

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
