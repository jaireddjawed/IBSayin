Template.login.events({
   'submit form': function(event){
       event.preventDefault();

       var user = {
         email: event.target.email.value.toLowerCase(),
         password: event.target.password.value
       };
       
       Meteor.loginWithPassword(user.email, user.password, function(error){
           if(error){
                alert(error.reason);
           } else {
               var currentRoute = Router.current().route.getName();
               if (currentRoute === "login"){
                   Router.go("home");
                   Meteor.users.update({_id: Meteor.userId()}, { $set: { "profile.lastLogin": new Date() }});
               }
           }
       });
       Router.go("home");
   }
});
Template.login.onRendered(function(){
    $(".login").validate({
        rules:{
          email: {
            required: true,
            email: true
          },
          password: {
            minlength: 6,
            required: true
          }
        },
        messages:{
           email:{
             required: "Please enter your email on your account."
           },
           password:{
             required: "Please enter your password."
           }
        }
    });
});