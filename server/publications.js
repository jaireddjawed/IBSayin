Meteor.publish("posts", function(){
  return Posts.find();
});
Meteor.publish("comments", function(){
  return Comments.find();
});
Meteor.publish("likes", function(){
  return Likes.find();
});
Meteor.publish("users", function(){
  return Meteor.users.find();
});