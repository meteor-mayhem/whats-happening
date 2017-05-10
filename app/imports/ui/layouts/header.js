import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/profiles.js';

// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Header.onCreated(function onCreated() {
  this.subscribe('Profiles');
});

Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();
});

Template.Header.helpers({
  user() {
    const user = Meteor.user();
    return user && user.profile.name;
  },

  loggedIn() {
    const user = Meteor.user();
    return user && Profiles.findOne({ username: user.profile.name });
  },
});

Template.Header.events({
  'click .item.sign.out': function signOut(event) {
    event.preventDefault();
    Meteor.logout();
    return false;
  },
});
