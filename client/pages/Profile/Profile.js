Template.Profile.onCreated(function() {
  Session.set('limit', 10);

  const userId = Session.get('userId');
  const limit = Session.get('limit');

  this.autorun(() => {
    this.subscribe('postsByUser', userId, limit);
  });
});

Template.Profile.helpers({
  userFullName() {
    return Meteor.user().profile.name;
  },
  userProfilePicture() {
    return Meteor.user().profile.picture;
  },
  posts() {
    return Posts.find({}, { sort: { date: - 1 } });
  },
});

Template.Profile.events({
  'click button[name=\'load-more\']': event => {
    event.preventDefault();

    const limit = Session.get('limit');
    Session.set('limit', limit + 10);
  },
});
