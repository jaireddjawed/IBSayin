Accounts.onLogin(({ user }) => {
  Meteor.users.update(user._id, {
    $set: {
      lastLogin: new Date(),
    },
  });
});
