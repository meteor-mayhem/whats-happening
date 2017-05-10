import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Profiles = new Mongo.Collection('Profiles');

// TODO remove this later
/* eslint-disable no-undef */
/* eslint-disable no-console */
gprofiles = Profiles;
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
  },
  organizations: {
    label: 'Organizations',
    type: [String],
  },
  bio: {
    label: 'Bio',
    type: String,
  },
  picture: {
    label: 'Picture',
    type: String,
  },
  phone: {
    label: 'Phone',
    type: String,
  },
  email: {
    label: 'Email',
    type: String,
  },
  attending: {
    label: 'Attending',
    type: [String],
  },
  saved: {
    label: 'Saved',
    type: [String],
  },
  followers: {
    label: 'Followers',
    type: [String],
  },
  following: {
    label: 'Following',
    type: [String],
  },
});

Profiles.attachSchema(ProfileSchema);
