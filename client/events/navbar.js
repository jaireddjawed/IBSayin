Template.navbar.helpers({
   profileId: function() {
       return Meteor.userId();
   } 
});
Template.navbar.events({
   'click #logout': function(event){
       event.preventDefault();
       Meteor.logout();
       Router.go("login");
   } 
});