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
    interests: ['Programming', 'Weatherboxes', 'Git'],
    organizations: ['SCEL'],
    bio: 'Hi I am Jerry. I like to program weatherboxes and play with Git.',
    picture: 'https://cdn.meme.am/images/600x600/9895039/sponge-bob-square-pants.jpg',
    phone: '222-222-2222',
    email: 'jerry@tom.com',
    attending: [],
    saved: [],
    followers: [],
    following: [],
  },
  {
    username: 'glennga',
    first: 'Glenn',
    last: 'Galvizo',
    interests: ['Programming', 'Math'],
    organizations: ['ICS 314'],
    bio: 'Hi I am Glenn. I like to program and Math.',
    picture: 'https://cdn.meme.am/cache/images/folder640/600x600/12104640/patrick-chocolate-face.jpg',
    phone: '333-333-3333',
    email: 'glenn@tom.com',
    attending: [],
    saved: [],
    followers: [],
    following: [],
  },
  {
    username: 'dtokita',
    first: 'Dylan',
    last: 'Tokita',
    interests: ['Programming', 'Weatherboxes', 'Git'],
    organizations: ['SCEL'],
    bio: 'Hi I am Dylan. I like to program weatherboxes and play with Git.',
    picture: 'https://cdn.meme.am/images/600x600/9895039/sponge-bob-square-pants.jpg',
    phone: '222-222-2222',
    email: 'dylan@tom.com',
    attending: [],
    saved: [],
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
