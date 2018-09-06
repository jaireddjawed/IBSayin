Meteor.users.schema = new SimpleSchema({
  emails: {
    type: Array,
    label: 'The emails associated with a user.',
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  profile: {
    type: Object,
    label: 'The user\'s profile.',
  },
  'profile.name': {
    type: String,
    label: 'The user\'s name.',
  },
  'profile.picture': {
    type: String,
    defaultValue: 'download.jpg',
    label: 'The user\'s profile picture.',
  },
  'profile.bio': {
    type: String,
    optional: true,
    label: 'The user\'s bio.',
  },
  createdAt: {
    type: Date,
  },
  lastLogin: {
    type: Date,
  },
  services: {
    type: Object,
    blackbox: true,
  },
});

Meteor.users.attachSchema(Meteor.users.schema);
