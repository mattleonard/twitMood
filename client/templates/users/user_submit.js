Template.userSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var user = {
      twitter_handle: $(e.target).find('[name=twitter_handle]').val()
    }

    Meteor.call('userInsert', user, function(error, result) {
      if (error)
        return alert(error.reason);

      Router.go('userPage', {twitter_handle: result.twitter_handle});
    })
  }
});