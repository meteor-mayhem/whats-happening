import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles/profiles.js';
import { Meteor } from 'meteor/meteor';

Template.Edit_Profile_Page.helpers({
  user: function user() {
    return Meteor.user().profile.name;
  },
  profile() {
    return Profiles.find({ username: FlowRouter.getParam('username') });
  },
  url() {
    return FlowRouter.getParam('username');
  },
  validate() {
    if(Meteor.user().profile.name == FlowRouter.getParam('username'))
      return true;
    return false;
  }
});

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe('Profiles'); // subscribe to 'Profiles'
});
