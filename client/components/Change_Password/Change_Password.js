Template.Change_Password.onRendered(() => {
  $('.change-password').validate({
    rules: {
      'current-password': {
        required: true,
      },
      'new-password': {
        required: true,
        minLength: 6,
      },
      'confirm-new-password': {
        required: true,
        equalTo: '[name=\'new-password\']'
      },
    },
    messages: {
      'current-password': {
        required: 'Please enter your current password.',
      },
      'new-password': {
        required: 'Please create a new password.',
      },
      'confirm-new-password': {
        required: 'Please confirm your new password.',
        equalTo: 'Your passwords don\'t match.',
      },
    },
  });
});

Template.Change_Password.events({
  'submit .change-password': event => {
    event.preventDefault();

    const { target } = event;
    const currentPassword = target['current-password'].value;
    const newPassword = target['new-password'].value;

    Accounts.changePassword(currentPassword, newPassword, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Sucessfully changed password!', 'success');
        FlowRouter.go('Home');
      }
    });
  },
});
