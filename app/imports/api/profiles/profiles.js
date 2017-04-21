import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Profiles = new Mongo.Collection('Profiles');

// TODO remove this later
profiles = Profiles; // globally access mongodb

/**
 * Create the schema for Profile
 */
export const ProfileSchema = new SimpleSchema({
  username: {
    label: 'Username',
    type: String, // figure out how we can set this to the myUH username automatically
  },
  first: {
    label: 'First',
    type: String,
    optional: false,
  },
  last: {
    label: 'Last',
    type: String,
    optional: false,
  },
  interests: {
    label: 'Interests',
    type: [String],
  },
  organizations: {
    label: 'Organizations',
    type: [String],
  },
});

Profiles.attachSchema(ProfileSchema);
