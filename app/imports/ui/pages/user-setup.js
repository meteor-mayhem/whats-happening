import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { categoryList } from './categories.js';
import { organizationList } from './organizations.js';

Template.User_Setup_Page.helpers({
  user: function user() {
    return Meteor.user().profile.name;
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
});
