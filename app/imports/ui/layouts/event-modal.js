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

  /** Determine if event is starred by user */
  starred() {
    const user = Profiles.findOne({ username: Meteor.user().profile.name });
    if (user) {
      return user.saved.includes(Session.get('clickedEventId'));
    }
    return null;
  },
});
