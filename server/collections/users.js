Meteor.methods({
  updateUserInfoTwitter: function(user_id) {
    user = Users.findOne({_id: user_id});

    Twit.get('users/show', { screen_name: user.twitter_handle }, Meteor.bindEnvironment(function (err, data, response) {
      return Users.update(user._id, {$set: {
        name: data.name,
        description: data.description,
        profile_image_url: data.profile_image_url
      }});
    }));
  }
});