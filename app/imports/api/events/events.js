import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Events = new Mongo.Collection('Events');

// TODO remove this later
/* eslint-disable no-undef */
events = Events; // globally access mongodb

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
  coordinates: {
    label: 'Coordinates',
    type: [Number],
    decimal: true,
    minCount: 2,
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
