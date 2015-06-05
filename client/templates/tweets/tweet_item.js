Template.tweetItem.helpers({
  heart_color: function() {
    return {0: "heart-black", 50: "heart-grey", 100: "heart-red"}[this.score]
  }
});