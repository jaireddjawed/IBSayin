Meteor.publish('posts', function(limit) {
  check(limit, Number);

  const posts = Posts.find({}, {
    limit,
    sort: { date: - 1 },
  });

  const getUserIdsFromPosts = posts.fetch().map(post => post.createdBy);
  const users = Meteor.users.find({ _id: { $in: getUserIdsFromPosts } }, {
    fields: {
      profile: 1,
      username: 1,
    },
  });

  return [
    posts,
    users,
  ];
});

Meteor.publish('postsByUser', function(userId, limit) {
  check(userId, String);
  check(limit, Number);

  return Posts.find({ createdBy: userId }, {
    limit,
    sort: { date: -1 },
  });
});
