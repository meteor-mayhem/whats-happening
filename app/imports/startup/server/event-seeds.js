import { Events } from '../../api/events/events.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const eventSeeds = [
  {
    name: 'Dodgeball',
    description: 'Play dodgeball with us',
    start: new Date(2017, 3, 20),
    end: new Date(2017, 3, 21),
    organizer: 'Jerry',
    email: 'jerry@jerry.com',
    phone: '808-967-5309',
    categories: ['Sports', 'Bonding', 'Good times'],
    location: 'Holmes Hall',
    coordinates: [3.14, 159],
    website: 'youtube.com',
  },
  {
    name: 'Hackathon',
    description: 'Let\'s hack some stuff',
    start: new Date(2017, 5, 20),
    end: new Date(2017, 8, 21),
    organizer: 'Tom',
    email: 'tom@tom.com',
    phone: '808-967-5309',
  },
];

/**
 * Initialize the Profile collection if empty with seed data.
 */
if (Events.find().count() === 0) {
  _.each(eventSeeds, function seedEvents(event) {
    Events.insert(event);
  });
}
