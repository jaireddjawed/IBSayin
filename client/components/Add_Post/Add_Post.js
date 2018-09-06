Template.Add_Post.events({
  'submit form': async event => {
    event.preventDefault();
    $('input, button').attr('disabled', true);

    const { target } = event;
    const quote = target.quote.value;
    let pictureAsBase64;

    if (target.picture.files.length > 0) {
      const [picture] = target.picture.files;
      const validFileExtensions = ["image/gif", "image/jpeg", "image/png"];

      if (validFileExtensions.includes(picture.type)) {
        pictureAsBase64 = await getBase64(picture);
      } else {
        Bert.alert('Invalid File Type!', 'danger');
      }
    }

    if (quote.trim() !== '' || pictureAsBase64) {
      Meteor.call('addPost', {
        quote,
        picture: pictureAsBase64,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          target.quote.value = '';
          target.picture.value = '';
        }

        $('input, button').attr('disabled', false);
      });
    } else {
      $('input, button').attr('disabled', false);
    }
  },
});
