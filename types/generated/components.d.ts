import type { Schema, Struct } from '@strapi/strapi';

export interface SharedPronoun extends Struct.ComponentSchema {
  collectionName: 'components_shared_pronouns';
  info: {
    displayName: 'pronoun';
    icon: 'user';
  };
  attributes: {
    custom_value: Schema.Attribute.String;
    value: Schema.Attribute.Enumeration<
      ['ella', '\u00E9l', 'elle/elles/ellxs']
    >;
  };
}

export interface SharedServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_items';
  info: {
    displayName: 'service_item';
    icon: 'briefcase';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    name: Schema.Attribute.String;
  };
}

export interface SharedSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'social_links';
    icon: 'link';
  };
  attributes: {
    bluesky: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    linkedin: Schema.Attribute.String;
    threads: Schema.Attribute.String;
    tiktok: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    website: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

export interface SharedTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_timeline_items';
  info: {
    displayName: 'timeline-item';
    icon: 'calendar';
  };
  attributes: {
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    description: Schema.Attribute.RichText;
    order: Schema.Attribute.Integer;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedValueItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_value_items';
  info: {
    displayName: 'value-item';
    icon: 'heart';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.pronoun': SharedPronoun;
      'shared.service-item': SharedServiceItem;
      'shared.social-links': SharedSocialLinks;
      'shared.timeline-item': SharedTimelineItem;
      'shared.value-item': SharedValueItem;
    }
  }
}
