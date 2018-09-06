Template.Posts.onCreated(function() {
  Session.set('limit', 10);
  this.autorun(() => {
    this.subscribe('posts', Session.get('limit'));
  });
});

Template.Posts.helpers({
  posts() {
    return Posts.find({}, { sort: { date: -1 } });
  },
});

Template.Posts.events({
  'click button[name=\'load-more\']': event => {
    event.preventDefault();

    const limit = Session.get('limit');
    Session.set('limit', limit + 10);
  },
});
