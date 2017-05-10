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

Template.Edit_Profile_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ProfileSchema.namedContext('Edit_Profile_Page');

  // Update header menu
  $('.active.item').removeClass('active');
  $('.edit.item').addClass('active');

});

Template.Edit_Profile_Page.helpers({
  profileDataField(fieldName) {
    const profileData = Profiles.findOne({ username: FlowRouter.getParam('username') });
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return profileData && profileData[fieldName];
  },
  user() {
    const user = Meteor.user();
    return user && user.profile.name;
  },
  profile() {
    return Profiles.find({ username: FlowRouter.getParam('username') });
  },
  url() {
    return FlowRouter.getParam('username');
  },
  validate() {
    if (Meteor.user().profile.name === FlowRouter.getParam('username')) {
      return true;
    }
    return false;
  },
  organizations() {
    const profileData = Profiles.findOne({ username: FlowRouter.getParam('username') });
    const selectedOrganizer = profileData && profileData.organizations;
    return profileData && _.map(organizationList,
            function makeCategoryObject(organization) {
              return { label: organization, selected: _.contains(selectedOrganizer, organization) };
            });
  },
  categories() {
    const profileData = Profiles.findOne({ username: FlowRouter.getParam('username') });
    const selectedInterests = profileData && profileData.interests;
    return profileData && _.map(categoryList,
            function makeCategoryObject(category) {
              return { label: category, selected: _.contains(selectedInterests, category) };
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

Template.Edit_Profile_Page.events({
  'submit .user-form'(event, instance) {
    event.preventDefault();
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
      const profile = Profiles.find({ username: FlowRouter.getParam('username') }).fetch();
      Profiles.update(profile[0]._id, { $set: newProfileData });
      instance.messageFlags.set(displayErrorMessages, false);
      instance.find('form').reset();
      instance.$('.dropdown').dropdown('restore defaults');
      FlowRouter.go(FlowRouter.path('Profile_Page', { username: Meteor.user().profile.name }));
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
