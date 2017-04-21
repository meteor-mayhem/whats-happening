import { Profiles } from '../../api/profiles/profiles.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const profileSeeds = [
  {
    username: 'mengyuan',
    first: 'Jerry',
    last: 'Wu',
    interests: ['Basketball', 'Volleyball', 'Programming'],
    organizations: ['HKN', 'IEEE', 'SCEL'],
    bio: 'Hi my name is Jerry',
  },
  {
    username: 'dtokita',
    first: 'Dylan',
    last: 'Tokita',
    interests: ['Basketball', 'Weatherboxes', 'Cloning Git Repos'],
    organizations: ['SCEL'],
  },
  {
    username: 'glennga',
    first: 'Glenn',
    last: 'Galvizo',
    interests: ['Math'],
    organizations: [],
    bio: 'Hi my name is Glenn',
  },
];

/**
 * Initialize the Profile collection if empty with seed data.
 */
if (Profiles.find().count() === 0) {
  _.each(profileSeeds, function seedProfiles(profile) {
    Profiles.insert(profile);
  });
}
