Router.route("/signup");
Router.route("/login");
Router.route("/chat", {
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if (currentUser){
            this.next();
        } else if (Meteor.loggingIn()){
            this.render('loading');
        } else if (Meteor.user() && !Meteor.user().emails[0].verified){
            //this.render('verification');
            console.log("verification");
        } else {
            this.render("login");
        }
    },
    template: "chat",
    name: "chat"
});
Router.route("/forum", {
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if (currentUser){
            this.next();
        } else if (Meteor.loggingIn()){
            this.render('loading');
        } else if (Meteor.user() && !Meteor.user().emails[0].verified){
            //this.render('verification');
            console.log("verification");
        } else {
            this.render("login");
        }
    },
    template: "forum",
    name: "forum"
});
Router.route("/home", {
    template: 'home',
    name: 'home',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if (currentUser){
            this.next();
        } else if (Meteor.loggingIn()){
            this.render('loading');
        } else if (Meteor.user() && !Meteor.user().emails[0].verified){
            //this.render('verification');
            console.log("verification");
        } else {
            this.render("login");
        }
    }
});
Router.route("/", {
   template: "mainpage",
   name: "mainpage"
});
Router.route("/post/:_id", {
    template: 'post',
    onBeforeAction: function(){
      var currentUser = Meteor.userId();
        if (currentUser){
            this.next();
        } else if (Meteor.loggingIn()){
            this.render('loading');
        } else if (Meteor.user() && !Meteor.user().emails[0].verified){
            //this.render('verification');
            console.log("verification");
        } else {
            this.render("login");
        }
    },
    data: function(){
        var currentPost = this.params._id;
        return Posts.findOne({ _id: currentPost });
    }
});
Router.route("/profile/:_id", {
   template: "profile",
   name: 'profile',
   onBeforeAction: function(){
       var currentUser = Meteor.userId();
        if (currentUser){
            this.next();
        } else if (Meteor.loggingIn()){
            this.render('loading');
        } else if (Meteor.user() && !Meteor.user().emails[0].verified){
            //this.render('verification');
            console.log("verification");
        } else {
            this.render("login");
        }
   },
   data: function(){
       var user = Meteor.userId();
       return Meteor.users.findOne({ _id: user });
   }
});
Router.route("/settings", {
    onBeforeAction: function(){
       var currentUser = Meteor.userId();
       if (currentUser){
            this.next();
       } else if (Meteor.loggingIn()){
            this.render('loading');
       } else if (Meteor.user() && !Meteor.user().emails[0].verified){
            //this.render('verification');
            console.log("verification");
       } else {
            this.render("login");
       }
    }
});
Router.route('recover-password', {
  name: 'recoverPassword',
  template: 'recoverPassword',
});
Router.route("/#/reset-password/:token", {
    name: 'resetpassword',
    template: 'resetpassword',
});
Router.route("/report-bug", {
   name: 'reportbug',
   template: 'reportbug',
   onBeforeAction: function(){
       var currentUser = Meteor.userId();
       if (currentUser){
            this.next();
       } else if (Meteor.loggingIn()){
            this.render('loading');
       } else if (Meteor.user() && !Meteor.user().emails[0].verified){
            //this.render('verification');
            console.log("verification");
       } else {
            this.render("login");
       }
    }
});
Router.route("/get-the-app", {
   name: 'get-app',
   template: 'get-app'
});
Router.route("/view-bug", {
   name: "viewBugs",
   template: "viewBugs"
});