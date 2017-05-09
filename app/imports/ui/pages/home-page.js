import { Template } from 'meteor/templating';
import { Events } from '../../api/events/events.js';

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe('Events'); // subscribe to 'Profiles'
});

Template.Home_Page.helpers({
  /**
   * @returns {*} The current profile given the username
   */
  event() {
    return Events.find();
  },
});

$('select.dropdown').dropdown();
