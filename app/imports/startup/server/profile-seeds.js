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
    interests: ['Jerry stuff', 'more stuff'],
    organizations: ['Jerry Wu Astronaut Magician', 'foo'],
    bio: 'Hi I am Jerry',
    events: [],
    attending: [],
    picture: 'https://pbs.twimg.com/media/CCuF1T6VEAA_GAM.png',
    followers: [],
    following: [],
  },
  {
    username: 'glennga',
    first: 'Glenn',
    last: 'Galvizo',
    interests: ['Glenn stuff', 'other stuff'],
    organizations: ['Glenn Galvizo for governor', 'ics'],
    bio: 'Hi I am Glenn',
    events: [],
    attending: [],
    picture: 'https://cdn.meme.am/cache/images/folder640/600x600/12104640/patrick-chocolate-face.jpg',
    followers: [],
    following: [],
  },
  {
    username: 'dtokita',
    first: 'Dylan',
    last: 'Tokita',
    interests: ['Dylan stuff', 'games'],
    organizations: ['Dylan Tokita for president', 'SCEL'],
    bio: 'Hi I am Dylan',
    events: [],
    attending: [],
    picture: 'https://cdn.meme.am/images/600x600/9895039/sponge-bob-square-pants.jpg',
    followers: [],
    following: [],
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
