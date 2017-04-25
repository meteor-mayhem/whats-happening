import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.User_Setup_Page.helpers({
  user: function user() {
    return Meteor.user().profile.name;
  },
});
