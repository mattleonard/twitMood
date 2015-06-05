score = function(user_id) {
  var tweets = Tweets.find({user_id: user_id, score:{$exists:true}}).fetch();
  var total_score = 0

  _.each(tweets, function(tweet) {
    return total_score += tweet.score;
  });

  return (total_score / tweets.length).toFixed(2);
}

Template.userPage.helpers({
  profile_image_url: function() {
    if(this.profile_image_url) {
      return this.profile_image_url.replace('_normal', '');
    }
  },
  heart_color: function() {
    var score_num = score(this._id)
    if (score_num >= 66) {
      return "heart-red";
    } else if (score_num <= 33) {
      return "heart-black";
    } else {
      return "heart-grey";
    }
  },
  heart_text: function() {
    var score_num = score(this._id)
    if (score_num >= 66) {
      return "happy clam";
    } else if (score_num <= 33) {
      return "negative nancy";
    } else {
      return "neutral";
    }
  },
  tweets: function() {
    return Tweets.find({user_id: this._id, score:{$exists:true}}, {sort: {date_created: -1}});
  },
  score: function() {
    return score(this._id);
  }
});

Template.userPage.events({
  'click .reload': function(e) {
    e.preventDefault();

    Meteor.call('reloadTweets', this._id);
  }
});