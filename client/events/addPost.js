Posts = new Mongo.Collection("posts");
FileOk = undefined;

Template.addPost.events({
   'submit form': function(event, template) {
       event.preventDefault();
       var quote = event.target.quote.value;
       var file = template.find('#picture').files[0]; // get the file

       if ($("#picture").val() === ""){
            Meteor.call("addPostWithoutPicture", quote, function(error, results){
                    if(error){
                        alert(error.reason);
                    } else {
                        console.log(results);
                    }
            });
       } else {
          var nameImage = $("#picture").val();
            if(nameImage.match(/jpg.*/)||nameImage.match(/jpeg.*/)||nameImage.match(/gif.*/)||nameImage.match(/png.*/)){
              FileOk = "picture";
            } else if (nameImage.match(/mov.*/)||nameImage.match(/mp4.*/)||nameImage.match(/ogg.*/)||nameImage.match(/mpeg4.*/)) {
              FileOk = "video";
            } else {
                window.alert("File format is not appropriate.");
                FileOk = undefined;
            }
          var reader = new FileReader();
          reader.onload = function (event) {
                // event.target.result is the base64 string
                 if ( FileOk === "picture"){
                    Meteor.call("addPostWithPicture", quote, event.target.result, function(error, results){
                        if(error){
                            alert(error.reason);
                        } else {
                            console.log(results);
                        }
                    });
                 } else if ( FileOk === "video"){
                   Meteor.call("addPostWithVideo", quote, event.target.result, function(error, results){
                        if(error){
                            alert(error.reason);
                        } else {
                            console.log(results);
                        }
                    });
                 }
          };
          reader.readAsDataURL(file);
       }
       event.target.quote.value = "";
       $("#picture").val("");
   }
});

Template.posts.helpers({
    posts(){
      return Posts.find({}, { sort: { date: -1 }});
    }
});

Template.addPost.onRendered(function(){
    $(".post").validate({
          rules:{
              quote:{
                  required: true
              }
          },
          messages:{
              quote:{
                  required: 'You must add text to your post.'
              }
          }
    });
});

Template.posts.onCreated(function(){
   this.subscribe("posts"); 
});
Template.post.onCreated(function(){
   this.subscribe("posts"); 
});