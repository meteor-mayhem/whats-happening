import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Profiles = new Mongo.Collection('Profiles');

// TODO remove this later
/* eslint-disable no-undef */
profiles = Profiles; // globally access mongodb

/**
 * Create the schema for Profile
 */
export const ProfileSchema = new SimpleSchema({
  username: {
    label: 'Username',
    type: String,
  },
  first: {
    label: 'First',
    type: String,
  },
  last: {
    label: 'Last',
    type: String,
  },
  interests: {
    label: 'Interests',
    type: [String],
    optional: true,
  },
  organizations: {
    label: 'Organizations',
    type: [String],
    optional: true,
  },
  bio: {
    label: 'Bio',
    type: String,
    optional: true,
  },
  events: {
    label: 'Events',
    type: SimpleSchema,
    optional: true,
  },
  picture: {
    label: 'Picture',
    type: String,
    optional: true,
  },
});

Profiles.attachSchema(ProfileSchema);
