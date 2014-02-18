/**
* FBLib test Module
*
* Description
*/
angular.module('FBLibTest', ['fblib'])
  .config(['$FBProvider', 'FacebookProvider', function($FBProvider, FacebookProvider) {

    // $FBProvider.setInitParams({
    //   appId: "588439911249155"
    // });

    FacebookProvider.settings({
      appId: '588439911249155',
      scope: ['email', 'user_birthday']
    });

    // FacebookProvider.setAppId('588439911249155');
    // FacebookProvider.setScope(['email', 'user_birthday']);

  }])

  .controller('MainCtrl', ['$scope', 'Facebook', '$FB', function($scope, Facebook, $FB) {

    $scope.user = {};

    var getUser = function() {
      return Facebook.getUser(['first_name', 'email', 'birthday']).then(function(user) {
        console.log(user);
        $scope.user = user;

        return user.id;
      });
    };

    var getUserProfilePicture = function(user_id) {
      return Facebook.profilePicture(user_id, null, null, 'normal').then(function(picture) {
        console.log(picture);
      })
    };

    var getUserFriends = function() {
      return Facebook.getUserFriends().then(function(friends) {
        console.log(friends);
      });
    };

    var postToWall = function() {
      return Facebook.postToWall({});
    };

    (function() {
      getUser()
        .then(getUserProfilePicture)
        .then(getUserFriends)
        .then(postToWall);
    }());

  }]);