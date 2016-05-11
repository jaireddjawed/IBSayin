Template.signup.events({
   'submit form': function(event){
       event.preventDefault();

       var name = event.target.name.value;
       var email = event.target.email.value;
           email = email.toLowerCase();
       var password = event.target.password.value;
       var classOf = event.target.class.value;
     
       Accounts.createUser({
          email: email,
          password: password,
          profile: {
              name: name,
              picture: "download.jpg",
              bio: "",
              hasBio: false,
              dateJoined: new Date(),
              lastLogin: new Date(),
              lastProfileUpdate: new Date(),
              class: classOf
          }
       });
       Router.go("home");
   }
});
Template.signup.onRendered(function(){
      $(".signup").validate({
          rules:{
            name:{
              required: true
            },
            email:{
              required: true,
              email: true
            },
            password:{
              required: true,
              minlength: 6
            },
            class:{
              required: true,
              minlength: 4,
              maxlength: 4
            }
          },
          messages:{
            name:{
              required: "Please enter your full name."
            },
            email:{
              required: "Please enter your email."
            },
            password:{
              required: "Please enter your password."
            },
            class: {
              required: "Please enter your LHS Grad class.",
              minlength: "Please enter a valid year.",
              maxlength: "Please enter a valid year."
            }
          }
      });
});