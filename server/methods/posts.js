Meteor.methods({
  addPost: function(post) {
    check(post, {
      quote: Match.Optional(String),
      picture: Match.Optional(String),
    });

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Not logged in!');
    }

    try {
      Posts.insert({
        createdBy: this.userId,
        text: post.quote,
        image: post.picture,
      });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});
