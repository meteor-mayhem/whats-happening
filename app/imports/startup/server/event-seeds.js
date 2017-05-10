import { Events } from '../../api/events/events.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
/* eslint-disable max-len */
const eventSeeds = [
  {
    name: 'Basketball',
    description: 'Basketball at McCully Park.',
    start: 'Mon May 08 2017 00:00:00 GMT-1000 (Hawaiian Standard Time)',
    end: 'Mon May 08 2017 23:59:00 GMT-1000 (Hawaiian Standard Time)',
    organizer: 'glennga',
    email: 'jerry@tom.com',
    phone: '111-111-1111',
    categories: ['Basketball', 'Sports'],
    location: 'McCully Park',
    picture: 'http://2.bp.blogspot.com/-W7oHjTpjLfY/UA4EcGG_RRI/AAAAAAAAAAM/IcINgw4R9z0/s1600/New+Basketball+Blog+Page+(Why+We+Love+Basketball).jpg',
  },
  {
    name: 'Billiards',
    description: 'All welcome to play 8-ball (except Nathan).',
    start: 'Mon May 08 2017 00:00:00 GMT-1000 (Hawaiian Standard Time)',
    end: 'Mon May 08 2017 23:59:00 GMT-1000 (Hawaiian Standard Time)',
    organizer: 'dtokita',
    email: 'dylan@tom.com',
    phone: '222-222-2222',
    categories: ['Billiards', 'Casual'],
    location: 'Frear Hall',
    picture: 'http://www.divinesgrill.com/wp-content/uploads/2016/07/339405-1600x1600.jpg',
  },
  {
    name: 'Math Study Session',
    description: 'Study Math with us to prepare for our exams.',
    start: 'Mon May 08 2017 00:00:00 GMT-1000 (Hawaiian Standard Time)',
    end: 'Mon May 08 2017 23:59:00 GMT-1000 (Hawaiian Standard Time)',
    organizer: 'glennga',
    email: 'glenn@tom.com',
    phone: '333-333-3333',
    categories: ['Math', 'Study'],
    location: 'Keller Hall',
    picture: 'https://az616578.vo.msecnd.net/files/responsive/cover/main/desktop/2017/04/28/636290142205786443-1628724858_Her%20Campus%20Studying%20Main%20_0.jpg',
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
