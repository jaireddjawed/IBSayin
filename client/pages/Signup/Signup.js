Template.Signup.onRendered(() => {
  $('form').validate({
    rules: {
      name: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      name: {
        required: "Please enter your full name.",
      },
      email: {
        required: "Please enter your email.",
      },
      password: {
        required: "Please enter your password.",
      },
    },
  });
});

Template.Signup.events({
  'submit form': event => {
    event.preventDefault();

    const { target } = event;

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;

    Accounts.createUser({
      email,
      password,
      profile: {
        name,
      },
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        FlowRouter.go('Home');
      }
    });
  },
});
