import { Template } from 'meteor/templating';
import { Events } from '../../api/events/events.js';

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Events');
  // $('select.dropdown').dropdown();

  // Update header menu
  $('.active.item').removeClass('active');
  $('.browse.item').addClass('active');
});

Template.Home_Page.helpers({
  /**
   * @returns {*} All the events
   */
  listEvents() {
    return Events.find();
  },
});

Template.Home_Page.events({
  'click .search.pointing.menu'(event) {
    // If clicked on the current tab, do nothing
    if (event.target.classList.contains('active')) {
      return;
    }

    // update active class
    $('.search.menu .active.item').removeClass('active');
    event.target.classList.add('active');

    // Toggle search menu
    $('.ui.search.segment').transition({
      duration: 300,
      animation: 'slide down',
    });
  },
});

