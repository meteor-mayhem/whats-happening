import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Landing_Page',
  action() {
    BlazeLayout.render('Landing_App_Body', { main: 'Landing_Page' });
  },
});

FlowRouter.route('/home', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/profile', {
  name: 'Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Profile_Page' });
  },
});

FlowRouter.route('/list', {
  name: 'List_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
  },
});

FlowRouter.route('/add', {
  name: 'Add_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Stuff_Page' });
  },
});

FlowRouter.route('/stuff/:_id', {
  name: 'Edit_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};

FlowRouter.route('/add-event-page', {
  name: 'Add_Event_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Event_Page' });
  },
});

FlowRouter.route('/add-event-2-page', {
  name: 'Add_Event_2_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Event_2_Page' });
  },
});

FlowRouter.route('/edit-event-page', {
  name: 'Edit_Event_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Event_Page' });
  },
});

FlowRouter.route('/edit-event-2-page', {
  name: 'Edit_Event_2_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Event_2_Page' });
  },
});

FlowRouter.route('/user-setup', {
  name: 'User_Setup_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Setup_Page' });
  },
});

FlowRouter.route('/edit-profile', {
  name: 'Edit_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile_Page' });
  },
});
