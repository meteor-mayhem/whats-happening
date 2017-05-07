import { Events } from '../../api/events/events.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const eventSeeds = [
  {
    name: 'Something fun',
    description: 'I forgot what the picture is',
    start: new Date(2017, 3, 20),
    end: new Date(2017, 3, 21),
    organizer: 'mengyuan',
    email: 'jerry@jerry.com',
    phone: '808-967-5309',
    categories: ['Sports', 'Bonding', 'Good times'],
    location: 'Holmes Hall',
    website: 'youtube.com',
    picture: 'http://jugssports.com/images/products/s3000.jpg',
  },
  {
    name: 'Football',
    description: 'Foooootball yeah!',
    start: new Date(2017, 5, 20),
    end: new Date(2017, 8, 21),
    organizer: 'dtokita',
    email: 'tom@tom.com',
    phone: '808-967-5309',
    picture: 'http://www.texasfootball.com/wp-content/uploads/2015/09/DC-29-e1441947941542.jpg',
  },
  {
    name: 'Volleyball',
    description: 'Ayyyeee play volleyball',
    start: new Date(2017, 5, 20),
    end: new Date(2017, 7, 21),
    organizer: 'glennga',
    email: 'tom@tom.com',
    phone: '808-967-5309',
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
