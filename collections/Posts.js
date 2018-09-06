Posts = new Mongo.Collection('posts');

Posts.schema = new SimpleSchema({
  text: {
    type: String,
    optional: true,
    label: 'Text of the user\'s post.',
  },
  createdBy: {
    type: String,
    label: 'The userId of the user who created the post.',
  },
  image: {
    type: String,
    optional: true,
    label: 'An optional image in base 64 format.',
  },
  date: {
    type: Date,
    defaultValue: new Date(),
  },
});

Posts.attachSchema(Posts.schema);
