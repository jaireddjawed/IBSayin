Template.Reset_Password.onRendered(() => {
  $('form').validate({
    rules: {
      password: {
        required: true,
        minLength: 6
      },
      'confirm-password': {
        required: true,
        equalTo: '[name=\'password\']'
      },
    },
    messages: {
      password: {
        required: 'Please create a new password.'
      },
      'confirm-password': {
        required: 'Please confirm your password.',
        equalTo: 'Your passwords don\'t match.',
      },
    },
  });
});

Template.Reset_Password.events({
  'submit form': event => {
    event.preventDefault();

    const { target } = event;

    const password = target.password.value;
    const passwordConfirm = target['confirm-password'].value;

    Accounts.resetPassword(Session.get('token'), password, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        FlowRouter.go('Home');
      }
    });
  },
});
