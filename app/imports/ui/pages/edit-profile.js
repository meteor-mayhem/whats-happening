import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.Edit_Profile_Page.helpers({
  user: function user() {
    return Meteor.user().profile.name;
  },
});
