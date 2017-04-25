import { Template } from 'meteor/templating';

Template.Date_Field.onRendered(function onRendered() {
  this.$('.ui.calendar').checkbox();
});
