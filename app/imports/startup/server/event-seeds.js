import { Events } from '../../api/events/events.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const eventSeeds = [
  {
    name: 'Event1',
    description: 'Event1 description',
    start: new Date(2017, 3, 20),
    end: new Date(2017, 3, 20),
    organizer: 'mengyuan',
    organizations: ['IEEE', 'HKN'],
    email: 'jerry@jerry.com',
    phone: '111-222-3333',
    categories: ['Fun1', 'Fun2'],
    location: 'Holmes Hall',
    website: 'Google.com',
    picture: 'http://www.texasfootball.com/wp-content/uploads/2015/09/DC-29-e1441947941542.jpg',
  },
  {
    name: 'Event2',
    description: 'Event2 description',
    start: new Date(2017, 3, 20),
    end: new Date(2017, 3, 20),
    organizer: 'dtokita',
    organizations: ['Dylan', 'Boss'],
    email: 'dylan@jerry.com',
    phone: '112-222-3333',
    categories: ['Good1', 'Good2'],
    location: 'Campus Center',
    website: 'Youtube.com',
    picture: 'http://jugssports.com/images/products/s3000.jpg',
  },
  {
    name: 'Event3',
    description: 'Event3 description',
    start: new Date(2017, 3, 20),
    end: new Date(2017, 3, 20),
    organizer: 'glennga',
    organizations: ['ICS', 'Johnson'],
    email: 'glenn@jerry.com',
    phone: '113-222-3333',
    categories: ['Boo1', 'Boo2'],
    location: 'ICS space',
    website: 'amazon.com.com',
    picture: 'http://www.teamexos.com/wp-content/uploads/2016/10/Location_Minneapolis3.jpg',
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
