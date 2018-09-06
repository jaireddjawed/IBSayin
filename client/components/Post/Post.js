Template.Post.helpers({
  userFullName(userId) {
    return Meteor.users.findOne(userId).profile.name;
  },
  formatDate(createdAt) {
    const date = new Date(createdAt);
    const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
    return `${formattedDate} ${formattedTime}`;
  },
});
