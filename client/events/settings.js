Template.settings.events({
   'submit form': function(event, template){
       event.preventDefault();
       var currentUser = Meteor.userId();
       var name = event.target.name.value;
       
       if ( name != "" ){
             Meteor.users.update({_id: currentUser}, { $set: {"profile.name": name, 'profile.lastProfileUpdate': new Date() } });
             Meteor.call('updateUserName', name );
       }
       var bio = event.target.bio.value;
       if ( bio != "" ){
             Meteor.users.update({_id: currentUser}, { $set: { "profile.bio": bio, "profile.hasBio": true, 'profile.lastProfileUpdate': new Date() }});
       }
       var file = template.find('#profilePicture').files[0]; // get the file
       if ($("#profilePicture").val() != ""){
          var reader = new FileReader();
          reader.onload = function (event) {
                // event.target.result is the base64 string
                Meteor.users.update({_id: currentUser}, { $set: { "profile.picture": event.target.result, 'profile.lastProfileUpdate': new Date() }});
                Meteor.call('updateProfilePicture', event.target.result);
          };
          reader.readAsDataURL(file);
       }
       var oldPassword = event.target.oldPassword.value;
       var newPassword = event.target.newPassword.value;
       var confirmNewPassword = event.target.confirmNewPassword.value;
       if(oldPassword != "" && newPassword === confirmNewPassword ){
           Accounts.changePassword(oldPassword, newPassword, function(error){
               if(error){
                 alert(error.reason);
               }
           }); 
       }
       Router.go("home");
   } 
});