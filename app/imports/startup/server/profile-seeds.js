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
    picture: 'https://pbs.twimg.com/media/CCuF1T6VEAA_GAM.png',
    followers: 9001,
  },
  {
    username: 'dtokita',
    first: 'Dylan',
    last: 'Tokita',
    interests: ['Basketball', 'Weatherboxes', 'Cloning Git Repos'],
    bio: 'Hi all, I am Dylan',
    organizations: ['SCEL'],
    picture: 'https://cdn.meme.am/images/600x600/9895039/sponge-bob-square-pants.jpg',
    followers: 90,
  },
  {
    username: 'glennga',
    first: 'Glenn',
    last: 'Galvizo',
    interests: ['Math'],
    organizations: [],
    bio: 'Hi my name is Glenn',
    picture: 'https://cdn.meme.am/cache/images/folder640/600x600/12104640/patrick-chocolate-face.jpg',
    followers: 91,
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
