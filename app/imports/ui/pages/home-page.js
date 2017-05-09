import { Template } from 'meteor/templating';
import { Events } from '../../api/events/events.js';

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Events');
  // $('select.dropdown').dropdown();
});

Template.Home_Page.helpers({
  /**
   * @returns {*} All the events
   */
  listEvents() {
    return Events.find();
  },
});
