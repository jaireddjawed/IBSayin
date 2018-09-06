Template.Navigation.events({
  'click #logout': () =>
      Meteor.logout(() =>
        FlowRouter.go('Login')),
});

Template.Navigation.helpers({
  currentUserId() {
    return Meteor.userId();
  },
});
