Template.Post.helpers({
  userFullName(userId) {
    return Meteor.users.findOne(userId).profile.name;
  },
  formatDate(createdAt) {
    const date = new Date(createdAt);
    return moment(date).format('MM/DD/YYYY HH:mm A');
  },
});
