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

    Facebook.getUser(['first_name', 'email', 'birthday']).then(function(user) {
      console.log(user);
    });

    Facebook.postToWall({
    });

    Facebook.getUserFriends().then(function(friends) {
      console.log(friends);
    });
  }]);