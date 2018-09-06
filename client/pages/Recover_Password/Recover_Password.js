Template.Recover_Password.onRendered(() => {
  console.log(this);
  $('form').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
    },
    messages: {
      email: {
        required: 'Please enter your email address.',
      },
    },
  });
});

Template.Recover_Password.events({
  'submit form': event => {
    event.preventDefault();

    const email = event.target.email.value;

    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Successfully sent password reset email!', 'success');
        FlowRouter.go('Login');
      }
    });
  },
});
