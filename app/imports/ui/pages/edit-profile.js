import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles/profiles.js';
import { Meteor } from 'meteor/meteor';

Template.Edit_Profile_Page.helpers({
  user: function user() {
    console.log(Meteor.user().profile.name);
    return Meteor.user().profile.name;
  },
  profile() {
    console.log(Profiles.find({ username: FlowRouter.getParam('username') }));
    return Profiles.find({ username: FlowRouter.getParam('username') });
  },
  url() {
    console.log(FlowRouter.getParam('username'));
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
