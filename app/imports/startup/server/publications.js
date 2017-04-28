import { Profiles } from '../../api/profiles/profiles.js';
import { Events } from '../../api/events/events.js';
import { Meteor } from 'meteor/meteor';

// Server will 'push' out the data as 'Profiles'
Meteor.publish('Profiles', function publishContactsData() {
  return Profiles.find();
});

// Server will 'push' out the data as 'Events'
Meteor.publish('Events', function publishEventData() {
  return Events.find();
});
