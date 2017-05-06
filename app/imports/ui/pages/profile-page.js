import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles/profiles.js';
import { Events } from '../../api/events/events.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Profile_Page.helpers({

  /**
   * @returns {*} The current profile given the username
   */
  profile() {
    return Profiles.find({ username: FlowRouter.getParam('username') });
  },

  /**
   * @returns {*} The events owned by the user
   */
  profileEvents() {
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
      case 0: return 'orange';
      case 1: return 'green';
      case 2: return 'red';
      case 3: return 'teal';
      case 4: return 'blue';
      case 5: return 'yellow';
      default: return 'secondary';
    }
  },
});

// Client will 'subscribe' to the 'Profiles' data
Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe('Profiles'); // subscribe to 'Profiles'
  this.subscribe('Events');
});
