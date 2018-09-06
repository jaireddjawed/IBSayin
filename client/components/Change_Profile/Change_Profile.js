Template.Change_Profile.onRendered(() => {
 $('.change-profile').validate({
   rules: {
     name: {
       required: true,
     },
     email: {
       required: true,
       email: true,
     },
   },
   messages: {
     name: {
       required: 'Please enter your full name.',
     },
     email: {
       required: 'Please enter your email address.',
     },
   },
 });
});

Template.Change_Profile.helpers({
  name() {
    return Meteor.user().profile.name;
  },
  email() {
    return Meteor.user().emails[0].address;
  },
  bio() {
    return Meteor.user().profile.bio;
  },
});

Template.Change_Profile.events({
  'change .profile-picture': async event => {
    const { target } = event;

    if (target.files.length > 0) {
      const [picture] = target.files;
      const validFileExtensions = ["image/gif", "image/jpeg", "image/png"];

      if (validFileExtensions.includes(picture.type)) {
        pictureAsBase64 = await getBase64(picture);
      } else {
        Bert.alert('Invalid File Type!', 'danger');
      }
    }

    if (pictureAsBase64) {
      Meteor.call('updateProfilePicture', pictureAsBase64, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Successfully updated profile picture!', 'success');
          target.value = '';
        }
      });
    }
  },
  'submit .change-profile': event => {
    event.preventDefault();

    const { target } = event;
    const profile = {
      email: target.email.value,
      name: target.name.value,
      bio: target.bio.value,
    };

    Meteor.call('updateProfile', profile, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Successfully updated profile!', 'success');
      }
    });
  },
});
