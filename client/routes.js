const PublicRouter = FlowRouter.group({
  triggersEnter: [() => {
    if (Meteor.loggingIn() || Meteor.user()) {
      FlowRouter.go('Home');
    }
  }],
});

const AuthRouter = FlowRouter.group({
  triggersEnter: [() => {
    if (!Meteor.loggingIn() && !Meteor.user()) {
      FlowRouter.go('Login');
    }
  }],
});

FlowRouter.route('/', {
  name: 'Main',
  action: () =>
    BlazeLayout.render('App', { children: 'Main' }),
});

PublicRouter.route('/signup', {
  name: 'Signup',
  action: () =>
    BlazeLayout.render('App', { children: 'Signup' }),
});

PublicRouter.route('/login', {
  name: 'Login',
  action: () =>
    BlazeLayout.render('App', { children: 'Login' }),
});

FlowRouter.route('/#/recover-password', {
  name: 'Recover_Password',
  action: () =>
    BlazeLayout.render('App', { children: 'Recover_Password' }),
});

FlowRouter.route('/#/reset-password/:token', {
  name: 'Reset_Password',
  action: ({ token }) => {
    Session.set('token', token);
    BlazeLayout.render('App', { children: 'Reset_Password' });
  },
});

FlowRouter.route('/#/verify-email/:token', {
  name: 'Verify_Email',
  action: ({ token }) => {
    Accounts.verifyEmail(token, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Successfully verified email!', 'success');
        FlowRouter.go('Login');
      }
    });
  },
});

AuthRouter.route('/home', {
  name: 'Home',
  action: () =>
    BlazeLayout.render('App', { children: 'Home' }),
});

AuthRouter.route('/profile/:userId', {
  name: 'Profile',
  action: ({ userId }) => {
    Session.set('userId', userId);
    BlazeLayout.render('App', { children: 'Profile' });
  },
});

AuthRouter.route('/settings', {
  name: 'Settings',
  action: () =>
    BlazeLayout.render('App', { children: 'Settings' }),
});
