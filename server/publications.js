Meteor.publish('users', function() {
  return Users.find();
});

Meteor.publish('tweets', function() { 
  return Tweets.find();
});