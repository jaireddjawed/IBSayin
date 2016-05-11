Template.profile.helpers({
  posts(){
    return Posts.find({createdBy: Meteor.userId()}, { sort: { date: -1 }});
  }
});
Template.profile.onCreated(function(){
  this.subscribe("posts");
});