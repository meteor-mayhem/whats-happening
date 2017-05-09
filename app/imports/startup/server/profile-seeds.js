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
    organizations: ['IEEE', 'HKN'],
    bio: 'Hi I am Jerry. I like to play sports and program.',
    picture: 'https://pbs.twimg.com/media/CCuF1T6VEAA_GAM.png',
  },
  {
    username: 'glennga',
    first: 'Glenn',
    last: 'Galvizo',
    interests: ['Programming', 'Math'],
    organizations: ['ICS 314'],
    bio: 'Hi I am Glenn. I like to program and Math.',
    picture: 'https://cdn.meme.am/cache/images/folder640/600x600/12104640/patrick-chocolate-face.jpg',
  },
  {
    username: 'dtokita',
    first: 'Dylan',
    last: 'Tokita',
    interests: ['Programming', 'Weatherboxes', 'Git'],
    organizations: ['SCEL'],
    bio: 'Hi I am Dylan. I like to program weatherboxes and play with Git.',
    picture: 'https://cdn.meme.am/images/600x600/9895039/sponge-bob-square-pants.jpg',
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
