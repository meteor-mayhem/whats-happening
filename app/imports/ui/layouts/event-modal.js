import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles/profiles.js';
import { Events } from '../../api/events/events.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

/* eslint-disable meteor/no-session */

Template.Event_Modal.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Events');
});

Template.Event_Modal.helpers({
  /** Check if we should load a modal--do not load if already there */
  shouldLoad() {
    return $('.event.modal').length !== 1;
  },

  /** Get clicked event card */
  clickedEvent() {
    // Retrieve event from session id
    return Events.find({ _id: Session.get('clickedEventId') });
  },

  /** Determine if user is owner of event */
  isOwner() {
    const user = Meteor.user();
    const event = Events.findOne({ _id: Session.get('clickedEventId') });
    if (user && event) {
      return user.profile.name === event.organizer;
    }
    return false;
  },

  /** Determine if event is starred by user */
  starred() {
    const user = Profiles.findOne({ username: Meteor.user().profile.name });
    if (user) {
      return user.saved.includes(Session.get('clickedEventId'));
    }
    return null;
  },
});

Template.Event_Modal.events({
  /** Save events */
  'click .star.icon'(event) {
    const eventId = Session.get('clickedEventId');
    const user = Profiles.findOne({ username: Meteor.user().profile.name });

    // Either save event or remove it
    if (event.target.classList.contains('empty')) {
      // Save event
      event.target.classList.add('yellow');
      event.target.classList.remove('empty');

      // Add event to user's 'saved' events
      if (!user.saved.includes(eventId)) {
        user.saved.push(eventId); // insert event id into user's saved array
        Profiles.update(user._id, { $set: { saved: user.saved } });
      }
    } else {
      // Remove saved event
      event.target.classList.remove('yellow');
      event.target.classList.add('empty');

      // Remove event from user's 'saved' events
      user.saved.splice(user.saved.indexOf(eventId), 1); // remove eventId from user's saved array
      Profiles.update(user._id, { $set: { saved: user.saved } });
    }
    console.log(user.saved);
  },
});
