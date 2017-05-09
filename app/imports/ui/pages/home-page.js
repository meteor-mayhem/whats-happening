import { Template } from 'meteor/templating';
import { Events } from '../../api/events/events.js';

Template.Home_Page.helpers({

  /**
   * @returns {*} The current profile given the username
   */
  event() {
    return Events.find();
  },
});

// Client will 'subscribe' to the 'Profiles' data
Template.Home_Page.onCreated(function onCreated() {
  this.subscribe('Events'); // subscribe to 'Profiles'
});

$('select.dropdown').dropdown();
