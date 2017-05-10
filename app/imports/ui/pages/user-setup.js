import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { categoryList } from './categories.js';
import { organizationList } from './organizations.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles, ProfileSchema } from '../../api/profiles/profiles.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.User_Setup_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ProfileSchema.namedContext('User_Setup_Page');

  // Update header menu
  $('.active.item').removeClass('active');
  $('.setup.item').addClass('active');
});

Template.User_Setup_Page.helpers({
  user() {
    const user = Meteor.user();
    return user && user.profile.name;
  },
  categories() {
    return _.map(categoryList, function makeCategoryObject(category) {
      return { label: category };
    });
  },
  organizations() {
    return _.map(organizationList, function makeOrganizationObject(organization) {
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
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
});

Template.User_Setup_Page.events({
  'submit .user-form'(event, instance) {
    event.preventDefault();
    const profileData = Profiles.findOne({ username: Meteor.user().profile.name });
    if (profileData !== undefined) {
      const myWindow = window.open('', 'MsgWindow', 'width=700,height=300');
      myWindow.document.write('<h4>User already exists, fowarding to edit profile page.</h4>');
      FlowRouter.go(FlowRouter.path('Edit_Profile_Page', { username: Meteor.user().profile.name }));
    }
    const username = Meteor.user().profile.name;
    const first = event.target.First_Name.value;
    const last = event.target.Last_Name.value;
    const selectedInterests = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    const interests = _.map(selectedInterests, (option) => option.value);
    const selectedOrganizations = _.filter(event.target.Organizations.selectedOptions, (option) => option.selected);
    const organizations = _.map(selectedOrganizations, (option) => option.value);
    const bio = event.target.About_Me.value;
    const picture = event.target.Profile_Picture.value;
    const email = event.target.Email.value;
    const phone = event.target.Phone.value;
    const followers = [];
    const following = [];
    const saved = [];
    const attending = [];
    const newProfileData = {
      username,
      first,
      last,
      interests,
      organizations,
      bio,
      picture,
      phone,
      email,
      attending,
      saved,
      followers,
      following,
    };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newEventdata reflects what will be inserted.
    ProfileSchema.clean(newProfileData);
    // Determine validity.
    instance.context.validate(newProfileData);
    if (instance.context.isValid()) {
      const id = Profiles.insert(newProfileData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go(FlowRouter.path('Home_Page', { _id: id }));
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
