Users = new Mongo.Collection('users');

Meteor.methods({
  userInsert: function(userAttributes) {
    var userWithSameName = Users.findOne({twitter_handle: userAttributes.twitter_handle});

    if(userWithSameName) {
      return {
        userExists: true,
        twitter_handle: userWithSameName.twitter_handle
      }
    }

    var userId = Users.insert(userAttributes);
    Meteor.call("updateUserInfoTwitter", userId);
    Meteor.call("getUserTweets", userId);

    return {
      twitter_handle: userAttributes.twitter_handle
    };
  }
});