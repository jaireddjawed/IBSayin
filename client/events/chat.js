Chat = new Mongo.Collection("chat");
Messages = new Mongo.Collection("Messages");
Meteor.subscribe("users");
AllowedUsers = new Array();

Template.chat.helpers({
  users(){
    return Meteor.users.find({_id:{$ne: Meteor.userId()}});
  }
});
Template.chat.events({
    'click .add-profile-name': function(event){
         event.preventDefault();
         alert(event.target.id);
         AllowedUsers.push(event.target.id);
         $(event.target.id).toggleClass("remove-profile-name");
    },
    'click .remove-profile-name': function(event){
         event.preventDefault();
         alert(event.target.id);
         for (var i=AllowedUsers.length-1; i>= 0; i--){
               if(AllowedUsers[i] === event.target.id){
                   AllowedUsers.splice(i, 1);
                   break;
               }
         }
         $(event.target.id).toggleClass("add-profile-name");
    },
    'click #create': function(event){
        event.preventDefault();
        Meteor.call("createChat", AllowedUsers);
    }
});
Template.chat.onRendered(function(){
      $(".chat").validate({
           rules:{
             room:{
               required: true
             },
             messages:{
               required: "Please create a room name."
             }
           }
      });
});