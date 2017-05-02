import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Profiles = new Mongo.Collection('Profiles');

// TODO remove this later
/* eslint-disable no-undef */
/* eslint-disable no-console */
profiles = Profiles;
showProfiles = function show() {
  _.each(Profiles.find().fetch(), function print(profile) {
    console.log(profile);
  });
  return `There are ${Profiles.find().count()} profiles`;
};

/*
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
    type: [String],
    optional: true,
  },
  attending: {
    label: 'Attending',
    type: [String],
    optional: true,
  },
  picture: {
    label: 'Picture',
    type: String,
    optional: true,
  },
  followers: {
    label: 'Followers',
    type: Number,
    optional: true,
  }
});

Profiles.attachSchema(ProfileSchema);
