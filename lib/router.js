Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { 
    return [Meteor.subscribe('users'), Meteor.subscribe('tweets')]; 
  }
});

Router.route('/', {name: 'userSubmit'});
Router.route('/users/:twitter_handle', {
  name: 'userPage',
  data: function() { return Users.findOne({twitter_handle: this.params.twitter_handle}); }
});
