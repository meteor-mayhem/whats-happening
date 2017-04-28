import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Events, EventSchema } from '../../api/events/events.js';
import { organizationList } from './organizations.js';

/* eslint-disable object-shorthand, no-unused-vars, no-param-reassign, prefer-template */

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
    const selectedOrganizer = eventData && eventData.organizer;
    return eventData && _.map(organizationList,
            function makeOrganizationObject(organization) {
              if (organization === selectedOrganizer) {
                return { label: organization, selected: true };
              }
              return { label: organization };
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
    const name = event.target.Name.value;
    const description = event.target.Description.value;
    // TODO: add date to an event...
    const start = '2012-04-23T18:25:43.511Z';
    const end = '2012-04-23T18:25:43.511Z';
    const organizer = event.target.Organization.value;
    const email = event.target.Email.value;
    const phone = event.target.Phone.value;

    // TODO: add date fields to here
    // grab previous record data
    const eventData = Events.findOne(FlowRouter.getParam('_id'));
    const updatedEventData = {
      name,
      description,
      start,
      end,
      organizer,
      email,
      phone,
      categories: eventData && eventData.categories,
      location: eventData && eventData.location,
      coordinates: eventData && eventData.coordinates,
      website: eventData && eventData.website,
      picture: eventData && eventData.picture,
    };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newEventData reflects what will be inserted.
    EventSchema.clean(updatedEventData);
    // Determine validity.
    instance.context.validate(updatedEventData);
    if (instance.context.isValid()) {
      const id = Events.update(FlowRouter.getParam('_id'), { $set: updatedEventData });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('../edit-event-2-page/' + FlowRouter.getParam('_id'));
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

