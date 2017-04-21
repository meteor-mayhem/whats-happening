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
    type: String,
    defaultValue: 'MC Hammer', // TODO replace this with the UH username
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
  },
  organizations: {
    label: 'Organizations',
    type: [String],
  },
});

Profiles.attachSchema(ProfileSchema);
