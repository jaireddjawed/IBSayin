Posts = new Mongo.Collection("posts");
Comments = new Mongo.Collection("comments");
Likes = new Mongo.Collection("likes");
Chat = new Mongo.Collection("chat");
Forum = new Mongo.Collection("forum");
Messages = new Mongo.Collection("messages");
Bugs = new Mongo.Collection("bugs");

Meteor.methods({
   'updateUserName': function(name){
       var currentUser = this.userId;
       if(!currentUser){
           throw new Meteor.Error("You are not logged in!");
       }
       if ( Posts.find({createdBy: currentUser}).fetch().length > 0 ){
        Posts.upsert({createdBy: currentUser}, { $set: { userName: name }}, { multi: true });
       }
   },
   'updateProfilePicture': function(picture){
       var currentUser = this.userId;
       if(!currentUser){
           throw new Meteor.Error("You are not logged in!");
       }
       if ( Posts.find({createdBy: currentUser}).fetch().length > 0 ){
        Posts.upsert({createdBy: currentUser}, { $set: { picture: picture}}, { multi: true });
       }
   },
   "addPostWithoutPicture": function(quote){
       var currentUser = this.userId;
       var user = Meteor.users.findOne({_id: currentUser});
       var username = user.profile.name;
       var profilePicture = user.profile.picture;
       if(!currentUser){
           throw new Meteor.Error("You are not logged in!");
       }
       Posts.insert({
           text: quote,
           date: new Date(),
           createdBy: currentUser,
           image: "",
           hasImage: false,
           userName: username,
           picture: profilePicture,
           hasVideo: false,
           userClass: user.profile.class
       });
   },
  "addPostWithPicture": function(quote, picture){
       var currentUser = this.userId;
       var user = Meteor.users.findOne({_id: currentUser});
       var username = user.profile.name;
       var profilePicture = user.profile.picture;
       if(!currentUser){
           throw new Meteor.Error("You are not logged in!");
       }
       Posts.insert({
          text: quote,
          date: new Date(),
          createdBy: currentUser,
          image: picture,
          hasImage: true,
          userName: username,
          picture: profilePicture,
          hasVideo: false,
          userClass: user.profile.class
       });
   },
   'addPostWithVideo': function(quote, picture){
       var currentUser = this.userId;
       var user = Meteor.users.findOne({_id: currentUser});
       var username = user.profile.name;
       var profilePicture = user.profile.picture;
       if(!currentUser){
           throw new Meteor.Error("You are not logged in!");
       }
       Posts.insert({
          text: quote,
          date: new Date(),
          createdBy: currentUser,
          image: picture,
          hasImage: false,
          userName: username,
          picture: profilePicture,
          hasVideo: true
       });
   },
   'addLike': function(postId){
     var currentUser = this.userId;
     var user = Meteor.users.findOne({_id: currentUser});
     Likes.insert({
       post: postId,
       user: this.userId,
       userName: user.profile.name
     });
   },
   'addComment':function(comment, postId){
     var currentUser = this.userId;
     var user = Meteor.users.findOne({_id: currentUser});
     Comments.insert({
         user: currentUser,
         userName: user.profile.name,
         comment: comment,
         post: postId
     });
    },
    'createChat': function(usersAllowed){
      var currentUser = this.userId;
      Chat.insert({
        owner: currentUser,
        usersAllowed: usersAllowed
      });
    },
    'createMessage': function(message, chatRoomId){
      var userId = this.userId;
      var user = Meteor.users.findOne({_id: userId});
        Messages.insert({
          message: message,
          userId: userId,
          chatRoomId: chatRoomId,
          userName: user.profile.name,
          picture: user.profile.picture
        });
    },
    'reportBug': function(bugDescription, page){
       var currentUser = this.userId;
       if(!currentUser){
           throw new Meteor.Error("You are not logged in!");
       }
       Bugs.insert({
          description: bugDescription, 
          page: page
       });
    }
});