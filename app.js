/**
* FBLib test Module
*
* Description
*/
angular.module('FBLibTest', ['fblib'])
  .config(['$FBProvider', 'FBLibProvider', function($FBProvider, FBLibProvider) {

    $FBProvider.setInitParams({
      appId: "588439911249155"
    });

    FBLibProvider.setScope(['email', 'user_birthday']);

  }])

  .controller('MainCtrl', ['$scope', 'FBLib', '$FB', function($scope, FBLib, $FB) {
    // $FB.api("/me?fields=" + 'email,birthday', function(user) {
    //   console.log(user);
    // });

    FBLib.getUser(['first_name', 'email', 'birthday']).then(function(user) {
      console.log(user);
    });

    FBLib.postToWall({
    });
  }]);