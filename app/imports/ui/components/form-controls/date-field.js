import { Template } from 'meteor/templating';

Template.Date_Field.onRendered(function onRendered() {
  this.$('.daterangepicker').daterangepicker({
    showDropdowns: true,
    timePicker: true,
    timePickerIncrement: 30,
    format: 'MM/DD/YYYY h:mm A',
  });
});
