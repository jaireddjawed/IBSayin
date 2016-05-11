Comments = new Mongo.Collection("comments");
Likes = new Mongo.Collection("likes");
Meteor.subscribe("comments");
Meteor.subscribe("likes");
/*
Template.comments.helpers({
    comments(){
      return Comments.find
    },
    likes(){
      
    }
});

Template.comments.events({
  
});*/