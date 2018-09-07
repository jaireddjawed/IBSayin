Template.Post.helpers({
  userFullName(userId) {
    return Meteor.users.findOne(userId).profile.name;
  },
  formatDate(createdAt) {
    const date = new Date(createdAt);
    const options = {
      weekday: 'long',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  },
});
