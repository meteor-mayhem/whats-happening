import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Events, EventSchema } from '../../api/events/events.js';
import { organizationList } from './organizations.js';
import { categoryList } from './categories.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable object-shorthand, no-param-reassign, prefer-template */

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Event_Page.onCreated(function onCreated() {
  this.subscribe('Events');
  this.subscribe('Profiles');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = EventSchema.namedContext('Edit_Event_Page');
});

Template.Edit_Event_Page.helpers({
  userHasEvent() {
    const currentUser = Meteor.user().profile.name;
    const currentEvent = FlowRouter.getParam('_id');

    return Events.find({ organizer: currentUser, _id: currentEvent }).fetch();
  },
  eventDataField(fieldName) {
    const eventData = Events.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return eventData && eventData[fieldName];
  },
  dateFieldAsString() {
    const eventData = Events.findOne(FlowRouter.getParam('_id'));
    const start = eventData && eventData.start;
    const end = eventData && eventData.end;

    function formatDate(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      if (!hours) {  // the hour '0' should be '12'
        hours = 12;
      }
      minutes = minutes < 10 ? '0' + minutes : minutes;
      const strTime = hours + ':' + minutes + ' ' + ampm;
      const month = date.getMonth() >= 11 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
      const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
      return month + '/' + day + '/' + date.getFullYear() + ' ' + strTime;
    }

    return formatDate(start) + ' - ' + formatDate(end);
  },
  organizations() {
    const eventData = Events.findOne(FlowRouter.getParam('_id'));
    const selectedOrganizer = eventData && eventData.organizations;
    return eventData && _.map(organizationList,
            function makeCategoryObject(organization) {
              return { label: organization, selected: _.contains(selectedOrganizer, organization) };
            });
  },
  categories() {
    const eventData = Events.findOne(FlowRouter.getParam('_id'));
    const selectedCategories = eventData && eventData.categories;
    return eventData && _.map(categoryList,
            function makeCategoryObject(category) {
              return { label: category, selected: _.contains(selectedCategories, category) };
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
    const start = new Date(event.target.DateTime.value.toString().slice(0, 19));
    const end = new Date(event.target.DateTime.value.toString().slice(22, 42));
    const organizer = Meteor.user().profile.name;
    const selectedOrganizations = _.filter(event.target.Organizations.selectedOptions, (option) => option.selected);
    const organizations = _.map(selectedOrganizations, (option) => option.value);
    const email = event.target.Email.value;
    const phone = event.target.Phone.value;
    const selectedCategories = _.filter(event.target.Categories.selectedOptions, (option) => option.selected);
    const categories = _.map(selectedCategories, (option) => option.value);
    const location = event.target.EventMap.value;
    const website = event.target.Website.value;
    const picture = event.target.Picture.value;
    const updatedEventData = {
      name,
      description,
      start,
      end,
      organizer,
      organizations,
      email,
      phone,
      categories,
      location,
      website,
      picture,
    };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newEventData reflects what will be inserted.
    EventSchema.clean(updatedEventData);
    // Determine validity.
    instance.context.validate(updatedEventData);
    if (instance.context.isValid()) {
      Events.update(FlowRouter.getParam('_id'), { $set: updatedEventData });
      instance.messageFlags.set(displayErrorMessages, false);
      instance.find('form').reset();
      instance.$('.dropdown').dropdown('restore defaults');
      FlowRouter.go(FlowRouter.path('Profile_Page', { username: Meteor.user().profile.name }));
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

