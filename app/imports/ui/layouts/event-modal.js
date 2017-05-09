import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles/profiles.js';
import { Meteor } from 'meteor/meteor';

Template.Event_Modal.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Events');
});

Template.Event_Modal.helpers({
  populate(id) {
    if (id) {
      return true;
    } else {
      return false;
    }
  },

});

Template.Event_Modal.events({
});
