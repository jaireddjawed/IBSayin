Template.recoverPassword.events({
   'submit form': function(event){
        event.preventDefault();
        
        var email = event.target.email.value;
            email = email.toLowerCase();
            
        Accounts.forgotPassword({email: email}, function(err){
            if (err) {
                if (err.message === 'User not found [403]') 
                    alert('This user does not exist.');
                else 
                    alert('We are sorry but something went wrong.');
            } else {
                    alert('Email Sent. Check your mailbox.');
            }
        });
        Router.go("login");
     return false;
   } 
});

if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.resetpassword.helpers({
 resetPassword: function(){
  return Session.get('resetPassword');
 }
});

Template.resetpassword.events({
  'submit form': function(event, t) {
    event.preventDefault();
    
    var password = event.target.newPassword.value;
    var passwordConfirm = event.target.confirmNewPassword.value;
    
        Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
            if (err) {
              alert('We are sorry but something went wrong.');
            } else {
                console.log('Your password has been changed. Welcome back!');
                Session.set('resetPassword', null);
                Router.go("home");
            }
        });
    return false;
  }
});

Template.recoverPassword.onRendered(function(){
    $(".recover-password").validate({
       rules:{
           email: {
               required: true,
               email: true
           }
       },
       messages:{
           email: {
               required: "Please enter the email address associated with your account.",
               email: "Please enter a valid email address"
           }
       }
    });
});

Template.resetpassword.onRendered(function(){
    $(".resetpassword").validate({
       rules: {
           newPassword :{
               required: true,
               minlength: 6
           },
           confirmNewPassword:{
               required: true,
               minlength: 6,
               equalTo: newPassword
           }
       },
       messages:{
           newPassword:{
               required: "Please enter your new password.",
               minlength: "Your new password must be at least 6 characters."
           },
           confirmNewPassword:{
               required: "Please confirm your new password.",
               equalTo: "Your passwords must be equal."
           }
       }
    });
});