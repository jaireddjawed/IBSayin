Meteor.methods({
  updateProfile: function(profile) {
    check(profile, {
      email: String,
      name: String,
      bio: String,
    });

    const findUserByEmail = Accounts.findUserByEmail(profile.email);
    if (findUserByEmail._id !== this.userId) {
      throw new Meteor.Error('email-exists', 'This email address already exists!');
    }

    try {
      Meteor.users.update(this.userId, {
        $set: {
          'emails.0.address': profile.email,
          'profile.name': profile.name,
          'profile.bio': profile.bio,
        },
      });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  updateProfilePicture: function(profilePicture) {
    check(profilePicture, String);

    try {
      Meteor.users.update(this.userId, {
        $set: {
          'profile.picture': profilePicture,
        },
      });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});
