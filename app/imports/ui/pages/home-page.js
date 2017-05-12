import { Template } from 'meteor/templating';
import { Events } from '../../api/events/events.js';
import { Profiles } from '../../api/profiles/profiles.js';
import { _ } from 'meteor/underscore';
import { organizationList } from './organizations.js';
import { categoryList } from './categories.js';
import { Session } from 'meteor/session';

/* eslint-disable max-len */
/* eslint-disable meteor/no-session */
/* eslint-disable no-param-reassign */

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Events');
  // $('select.dropdown').dropdown();

  // Update header menu
  $('.active.item').removeClass('active');
  $('.browse.item').addClass('active');
});

Template.Home_Page.helpers({
  /** Returns events according to the current filters */
  listEvents() {
    const filters = Session.get('filters');
    const events = Events.find().fetch();

    // If no filters then just return everything
    if (!filters) {
      return events;
    }

    // If AND filtering
    if (filters.type === 'and') {
      return _.filter(events, function checkConditions(event) {
        // console.log(`processing event: ${event.name}`);
        if (filters.name.length && !event.name.toUpperCase().includes(filters.name.toUpperCase())) {
          // console.log('and name failed');
          return false;
        }
        // Get organizer full name
        const user = Profiles.findOne({ username: event.organizer });
        const fullName = `${user.first} ${user.last}`;
        if (filters.organizer.length && !fullName.toUpperCase().includes(filters.organizer.toUpperCase())) {
          // console.log('and organizer failed');
          return false;
        }
        if (filters.categories.length && _.difference(filters.categories, event.categories).length) {
          // console.log('and categories failed');
          return false;
        }
        if (filters.organizations.length && _.difference(filters.organizations, event.organizations).length) {
          // console.log('and organizations failed');
          return false;
        }
        return true;
      });
    } else
      if (filters.type === 'or') { // OR filtering
        return _.filter(events, function checkConditions(event) {
          // console.log(`processing event: ${event.name}`);
          if (filters.name.length && event.name.toUpperCase().includes(filters.name.toUpperCase())) {
            // console.log('or name passed');
            return true;
          }
          const user = Profiles.findOne({ username: event.organizer });
          const fullName = `${user.first} ${user.last}`;
          if (filters.organizer.length && fullName.toUpperCase().includes(filters.organizer.toUpperCase())) {
            // console.log('or organizer passed');
            return true;
          }
          if (filters.categories.length && _.intersection(filters.categories, event.categories).length) {
            // console.log('or categories passed');
            return true;
          }
          if (filters.organizations.length && _.intersection(filters.organizations, event.organizations).length) {
            // console.log('or organizations passed');
            return true;
          }
          return false;
        });
      }

    return events;
  },

  /** Returns the current value of a field stored in the session*/
  sessionValue(field) {
    const filters = Session.get('filters');
    return filters && filters[field];
  },

  /** Returns a list of the organizations */
  organizations() {
    return _.map(organizationList, function makeOrganizationObject(organization) {
      return { label: organization };
    });
  },

  /** Returns all the categories */
  categories() {
    return _.map(categoryList, function makeCategoryObject(category) {
      return { label: category };
    });
  },
});

Template.Home_Page.events({
  /** Show/hide the search menu */
  'click .home.menu .item'(event) {
    // If clicked on the current tab, do nothing
    if (event.target.classList.contains('active')) {
      return;
    }

    // update active class
    $('.home.menu .active.item').removeClass('active');
    event.target.classList.add('active');

    // Toggle search menu
    $('.ui.search.segment').transition({
      duration: 400,
      animation: 'slide down',
    });
  },

  /** Logical filtering buttons */
  'click .ui.filtering.button'(event) {
    // If clicked on the current button, do nothing
    if (event.target.classList.contains('green')) {
      return;
    }

    // update selected button
    $('.filtering.green.button').removeClass('green');
    event.target.classList.add('green');
  },

  /** Process search query */
  'submit .search.form'(event) {
    event.preventDefault();
    const name = event.target.Name.value;
    const organizer = event.target.Organizer.value;
    const categories = _.map(_.filter(event.target.Categories.selectedOptions, (option) => option.selected), (option) => option.value);
    const organizations = _.map(_.filter(event.target.Organizations.selectedOptions, (option) => option.selected), (option) => option.value);
    const type = $('.filtering.green.button').hasClass('logical-and') ? 'and' : 'or';

    // Save info into a filter if it's not empty
    if (name.length || organizer.length || (categories.length && categories[0] !== '') || (organizations.length && organizations[0] !== '')) {
      Session.set('filters', { name, organizer, categories, organizations, type });
    } else {
      Session.set('filters', undefined);
    }
  },

  /** Reset fields*/
  'click .reset.button'() {
    // Reset form
    _.each($('.input.field input'), function clear(select) {
      select.value = '';
    });
    $('.input.field .dropdown').dropdown('restore defaults');

    Session.set('filters', undefined);
  },
});

