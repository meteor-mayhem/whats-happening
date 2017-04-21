import { Profiles } from '../../api/profiles/profiles.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const profileSeeds = [
  {
    first: 'Jerry',
    last: 'Wu',
    interests: ['Basketball', 'Volleyball', 'Programming'],
    organizations: ['HKN', 'IEEE', 'SCEL'],
  },
  {
    first: 'Dylan',
    last: 'Tokita',
    interests: ['Basketball', 'Weatherboxes', 'Cloning Git Repos'],
    organizations: ['SCEL'],
  },
  {
    first: 'Glenn',
    last: 'Galvizo',
    interests: ['Math'],
    organizations: [],
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
