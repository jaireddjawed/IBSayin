Template.reportbug.events({
   'submit form': function(event){
       event.preventDefault();
       
       var bugDescription = event.target.bugDescription.value;
       var page = event.target.page.value;
       
       Meteor.call("reportBug", bugDescription, page);
       Router.go("home");
   } 
});

Template.reportbug.onRendered(function(){
    $(".report-bug").validate({
       rules:{
           bugDescription: {
               required: true
           },
           page: {
               required: true
           }
       },
       messages:{
           bugDescription:{
               required: "Please describe the bug that you see in the box above."
           }, 
           page:{
               required: "Please enter the page that this bug is on."
           }
       }
    });
});