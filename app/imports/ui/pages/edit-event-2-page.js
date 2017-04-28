import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Events, EventSchema } from '../../api/events/events.js';
import { categoryList } from './categories.js';

/* eslint-disable object-shorthand, no-unused-vars, no-param-reassign */

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Event_2_Page.onCreated(function onCreated() {
  this.subscribe('Events');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = EventSchema.namedContext('Edit_Event_2_Page');
});

Template.Edit_Event_2_Page.helpers({
  eventDataField(fieldName) {
    const eventData = Events.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return eventData && eventData[fieldName];
  },
  eventId() {
    return Events.findOne(FlowRouter.getParam('_id'));
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
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject & Template.instance().context.keyErrorMessage(errorObject.name);
  },
  categories() {
    const eventData = Events.findOne(FlowRouter.getParam('_id'));
    const selectedCategories = eventData && eventData.categories;
    return eventData && _.map(categoryList,
            function makeCategoryObject(category) {
              return { label: category, selected: _.contains(selectedCategories, category) };
            });
  },
});

Template.Edit_Event_2_Page.events({
  'submit .event-form'(event, instance) {
    event.preventDefault();
    const selectedCategories = _.filter(event.target.Categories.selectedOptions, (option) => option.selected);
    const categories = _.map(selectedCategories, (option) => option.value);
    // get location (location picker)
    // TODO: add location
    const location = 'none';
    const coordinates = [0.0, 0.0];
    const website = event.target.Website.value;
    const picture = event.target.Picture.value;

    // grab previous record data
    const eventData = Events.findOne(FlowRouter.getParam('_id'));
    const updatedEventData = {
      name: eventData && eventData.name,
      description: eventData && eventData.description,
      start: eventData && eventData.start,
      end: eventData && eventData.end,
      organizer: eventData && eventData.organizer,
      email: eventData && eventData.email,
      phone: eventData && eventData.phone,
      categories,
      location,
      coordinates,
      website,
      picture,
    };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newEventdata reflects what will be inserted.
    EventSchema.clean(updatedEventData);
    // Determine validity.
    instance.context.validate(updatedEventData);

    if (instance.context.isValid()) {
      const id = Events.update(FlowRouter.getParam('_id'), { $set: updatedEventData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
      instance.find('form').reset();
      instance.$('.dropdown').dropdown('restore defaults');
      FlowRouter.go('../profile');
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

