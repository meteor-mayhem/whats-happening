import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Events, EventSchema } from '../../api/events/events.js';

/* eslint-disable object-shorthand, no-unused-vars, no-param-reassign */

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Event_Page.onCreated(function onCreated() {
  this.subscribe('Events');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = EventSchema.namedContext('Edit_Event_Page');
});

Template.Edit_Event_Page.helpers({
  eventDataField(fieldName) {
    const eventData = Events.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return eventData && eventData[fieldName];
  },
  organizations() {
    const eventData = Events.findOne(FlowRouter.getParam('_id'));
    const selectedOrganization = eventData && eventData.organizer;
    return eventData && _.map(organizationList,
            function makeOrganizationObject(organization) {
              if (organization.value === selectedOrganization) {
                organization.selected = true;
              }
              return organization;
            });
  },
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
});

Template.Edit_Event_Page.events({

  'submit .event-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const name = event.target.Name.value;
    // Get description (text field)
    const description = event.target.Description.value;
    // Get date (date-picker)
    // TODO: add date to an event...
    // Get organizer (drop down list)
    const organizer = event.target.Organization.value;
    // Get email (text field)
    const email = event.target.Email.value;
    // Get phone number (text field)
    const phone = event.target.Phone.value;

    // TODO: add date fields to here
    const updatedEventData = { name, description, organizer, email, phone };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    Events.clean(updatedEventData);
    // Determine validity.
    instance.context.validate(updatedEventData);

    if (instance.context.isValid()) {
      const id = Events.update(FlowRouter.getParam('_id'), { $set: updatedEventData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

