import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.Landing_Page.events({
  'click .ui.large.green.button.sign.up': function casLogin(event) {
    event.preventDefault();
    const callback = function loginCallback(error) {
      if (error) {
        console.log(error);
      }
    };
    Meteor.loginWithCas(callback);
    return false;
  },
});
