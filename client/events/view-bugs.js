Bugs = new Meteor.Collection("bugs");
Template.viewBugs.onCreated(function(){
   this.subscribe("bugs"); 
});

Template.viewBugs.helpers({
   bugs(){
       return Bugs.find({});
   }
});