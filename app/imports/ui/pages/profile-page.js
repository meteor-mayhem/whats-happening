import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles/profiles.js';
import { Events } from '../../api/events/events.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Events');
});

Template.Profile_Page.helpers({
  /**
   * @returns {*} True if logged in as the profile user, false otherwise
   */
  isUser() {
    return Meteor.user().profile.name === FlowRouter.getParam('username');
  },

  /**
   * @returns {*} The current profile given the username
   */
  profile() {
    return Profiles.find({ username: FlowRouter.getParam('username') });
  },

  /**
   * @returns {*} The events owned by the user
   */
  ownEvents() {
    return Events.find({ organizer: FlowRouter.getParam('username') });
  },

  /**
   * @returns {*} The events owned by the user
   */
  attendingEvents() {
    return Events.find({ organizer: 'dtokita' });
  },

  /**
   * @returns {*} The events owned by the user
   */
  savedEvents() {
    return Events.find({ organizer: 'glennga' });
  },

  /**
   * Hash function that maps a string input to a color--used for coloring stuff
   * @param str
   * @returns {*} a string representing a color
   */
  colorize(str) {
    let hash = 5381;
    let i = str.length;

    while (i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }

    switch ((hash >>> 0) % 6) {
      case 0:
        return 'orange';
      case 1:
        return 'green';
      case 2:
        return 'red';
      case 3:
        return 'teal';
      case 4:
        return 'blue';
      case 5:
        return 'yellow';
      default:
        return 'secondary';
    }
  },
});

Template.Profile_Page.events({
  /**
   * Logic for the active menu item and transitions
   */
  'click .event'(event) {
    let newItem;
    let oldItem;

    // Determine which item was just clicked
    if (event.target.classList.contains('own')) {
      newItem = 'own';
    } else if (event.target.classList.contains('attending')) {
      newItem = 'attending';
    } else {
      newItem = 'saved';
    }

    // Determine which item was previously active
    if ($('.ui.event.menu .active.item').hasClass('own')) {
      oldItem = 'own';
    } else if ($('.ui.event.menu .active.item').hasClass('attending')) {
      oldItem = 'attending';
    } else {
      oldItem = 'saved';
    }

    // If the two items are the same, don't do anything
    if (newItem === oldItem) {
      console.log('same');
      return;
    }

    console.log(oldItem, newItem);

    // Update the 'active' class
    $(`.ui.event.menu .${oldItem}.item`).removeClass('active');
    $(`.ui.event.menu .${newItem}.item`).addClass('active');

    // Transition cards
    if (oldItem === 'own') {
      $(`.ui.${oldItem}.four.cards`).transition('slide right', function after() {
        $(`.ui.${newItem}.four.cards`).transition('slide left');
      });
      console.log('old right, new left');
    } else if (oldItem === 'saved') {
      $(`.ui.${oldItem}.four.cards`).transition('slide left', function after() {
        $(`.ui.${newItem}.four.cards`).transition('slide right');
      });
      console.log('old left, new right');
    } else if (newItem === 'own') {
      $(`.ui.${oldItem}.four.cards`).transition('slide left', function after() {
        $(`.ui.${newItem}.four.cards`).transition('slide right');
      });
      console.log('old left, new right');
    } else {
      $(`.ui.${oldItem}.four.cards`).transition('slide right', function after() {
        $(`.ui.${newItem}.four.cards`).transition('slide left');
      });
      console.log('old right, new left');
    }
  },
});
