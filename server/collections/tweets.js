var sentiment_map = {'Positive': 100, 'Neutral': 50, 'Negative': 0};

Meteor.methods({
  getUserTweets: function(user_id) {
    user = Users.findOne({_id: user_id});

    Twit.get('statuses/user_timeline', { screen_name: user.twitter_handle, count: 200 }, Meteor.bindEnvironment(function (err, data, response) {
      _.each(data, function(tweet) {
        tweet_id = Tweets.insert({user_id: user_id, body: tweet.text});
        Meteor.call('analyzeTweet',tweet_id);
      });
    }));
  },
  reloadTweets: function(user_id) {
    Tweets.remove({user_id: user_id});

    Meteor.call('getUserTweets', user_id);
  },
  analyzeTweet: function(tweet_id) {
    var tweet = Tweets.findOne({_id: tweet_id});

    HTTP.call('POST', 'https://community-sentiment.p.mashape.com/text/', 
    { 
      headers: {
        "X-Mashape-Key": "sh7CQL0kvPmshVf7gU0VfQYOMJPTp1KGHTBjsncldI1uWEzo4L",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      }, 
      params: {txt: tweet.body}
    }, function(error, results) {
      var sentiment = results.data.result.sentiment;
      var sentiment_score = sentiment_map[sentiment];

      return Tweets.update(tweet._id, {$set: {score: sentiment_score}});
  }); 
  }
});