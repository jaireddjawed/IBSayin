Template.Login.onRendered(() => {
  $('form').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        minlength: 6,
        required: true
      },
    },
    messages: {
      email: {
        required: 'Please enter your email address.',
      },
      password: {
        required: 'Please enter your password.',
      },
    },
  });
});

Template.Login.events({
  'submit form': event => {
    event.preventDefault();

    const { target } = event;

    const email = target.email.value;
    const password = target.password.value;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        FlowRouter.go('Home');
      }
    });
  },
});
