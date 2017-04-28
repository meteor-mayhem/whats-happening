import { Template } from 'meteor/templating';

Template.Date_Field.onRendered(function onRendered() {
  this.$('.daterangepicker').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
      format: 'MM/DD/YYYY h:mm A',
    },
  });
});
