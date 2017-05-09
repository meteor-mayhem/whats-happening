import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Events = new Mongo.Collection('Events');

// TODO remove this later
/* eslint-disable no-undef */
/* eslint-disable no-console */
gevents = Events;
showEvents = function show() {
  _.each(Events.find().fetch(), function print(event) {
    console.log(event);
  });
  return `There are ${Events.find().count()} events`;
};

/**
 * Create the schema for Profile
 */
export const EventSchema = new SimpleSchema({
  name: {
    label: 'Name',
    type: String,
  },
  description: {
    label: 'Description',
    type: String,
  },
  start: {
    label: 'Start',
    type: Date,
  },
  end: {
    label: 'End',
    type: Date,
  },
  organizer: {
    label: 'Organizer',
    type: String,
  },
  organizations: {
    label: 'Organizations',
    type: [String],
    optional: true,
  },
  email: {
    label: 'Email',
    type: String,
  },
  phone: {
    label: 'Phone',
    type: String,
    // regEx: /^[1-9]\d{2}-\d{3}-\d{4}/,
    optional: false,
    max: 12,
  },
  categories: {
    label: 'Categories',
    type: [String],
    optional: true,
  },
  location: {
    label: 'Location',
    type: String,
    optional: true,
  },
  website: {
    label: 'Website',
    type: String,
    optional: true,
  },
  picture: {
    label: 'Picture',
    type: String,
    optional: true,
  },
});

Events.attachSchema(EventSchema);
