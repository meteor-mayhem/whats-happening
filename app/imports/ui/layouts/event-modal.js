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

  /** Formats the date into a modal-friendly format */
  formatDate(date) {
    const day = date.toString().substring(4, 15);
    const hh = parseInt(date.toString().substring(16, 18), 10);
    const mm = date.toString().substring(19, 21);

    // Determine AM or PM
    if (hh < 12) {
      return `${day} ${hh}:${mm} AM`;
    }
    return `${day} ${hh - 12}:${mm} PM`;
  },

  /** Returns the picture URL of the owner */
  userPicture(owner) {
    const user = Profiles.findOne({ username: owner });
    return user && user.picture;
  },

  /** Gets the name of the user, given the username */
  getName(username) {
    const user = Profiles.findOne({ username });
    return user && `${user.first} ${user.last}`;
  },

  /** Determine if event is starred by user */
  starred() {
    const user = Profiles.findOne({ username: Meteor.user().profile.name });
    if (user) {
      return user.saved.includes(Session.get('clickedEventId'));
    }
    return null;
  },

  /** Determine if user is attending event */
  attending() {
    let user;

    if (Meteor.user()) {
      user = Profiles.findOne({ username: Meteor.user().profile.name });

      if (user) {
        return user.attending.includes(Session.get('clickedEventId'));
      }
    }
    return null;
  },

  loggedIn() {
    const user = Meteor.user();
    return user && Profiles.findOne({ username: user.profile.name });
  },
});

Template.Event_Modal.events({
  /** Attending event handler */
  'click .event.modal .attend.button'(event) {
    const eventId = Session.get('clickedEventId');
    const user = Profiles.findOne({ username: Meteor.user().profile.name });

    // Either save event or remove it
    if (!event.target.classList.contains('active')) {
      // Save event
      event.target.classList.add('active');

      // Add event to user's 'attending' events
      if (!user.attending.includes(eventId)) {
        user.attending.push(eventId); // insert event id into user's attending array
        Profiles.update(user._id, { $set: { attending: user.attending } });
      }
    } else {
      // Remove attending event
      event.target.classList.remove('active');

      // Remove event from user's 'attending' events
      user.attending.splice(user.attending.indexOf(eventId), 1); // remove eventId from user's attending array
      Profiles.update(user._id, { $set: { attending: user.attending } });
    }
  },

  /** Close modal when navigating away */
  'click .event.modal .edit.button'() {
    $('.modal').modal('hide').modal('hide dimmer');
  },

  /** Close modal when navigating away */
  'click .event.modal .user-link'() {
    $('.modal').modal('hide').modal('hide dimmer');
  },

  /** Save events */
  'click .event.modal .star.icon'(event) {
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
  },
});
