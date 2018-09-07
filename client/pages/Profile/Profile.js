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
    const userId = Session.get('userId');
    return Meteor.users.findOne(userId).profile.name;
  },
  userProfilePicture() {
    const userId = Session.get('userId');
    return Meteor.users.findOne(userId).profile.picture;
  },
  bio() {
    const userId = Session.get('userId');
    return Meteor.users.findOne(userId).profile.bio;
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
