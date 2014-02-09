angular.module('fblib', ['ezfb'])

  /*
  |------------------------------------------------------------
  | Facebook Wrapper Service
  |------------------------------------------------------------
  |
  | This service provides a wrapper around the Facebook API,
  | to conveniently access functions that are used often.
  | Utilizes the great easy-fb service by pc035860, which
  | can be found on https://github.com/pc035860/angular-easyfb
  |
   */
  .provider('Facebook', function() {
    var _scope = [], _appId, _settings;

    return {

      /*
      |------------------------------------------------
      | Setters
      |------------------------------------------------
       */
      settings: function(settings) {
        _settings = settings;
      },

      /*
      |------------------------------------------------
      | $get
      |------------------------------------------------
       */
      $get: ['$FB', '$q', function($FB, $q) {

        var api = {

          /**
           * Gets the app id
           * 
           * @return {string}
           */
          getAppId: function() {
            return _settings.appId;
          },

          /**
           * Connect to Facebook with the given permissions
           * 
           * @return {promise}
           */
          connect: function() {
            var deferred = $q.defer();

            $FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                deferred.resolve();
              } else {
                var scope_string = _settings.scope.join();

                $FB.login(function(response) {
                  if (response.authResponse) {
                    deferred.resolve();
                  } else {
                    deferred.reject();
                  }
                }, {scope: scope_string});
              }
            });

            return deferred.promise;
          },

          /**
           * Gets the current Facebook user with the specified fields
           * 
           * @return {promise}
           */
          getUser: function(fields) {
            var deferred = $q.defer();
            var fields_string = fields.join();

            api.connect().then(function() {
              $FB.api("/me?fields=" + fields_string, function(user) {
                deferred.resolve(user);
              });
            }, function() {
              deferred.reject();
            });

            return deferred.promise;
          },

          /**
           * Gets the current Facebook user's friends
           * 
           * @return {promise}
           */
          getUserFriends: function() {
            var deferred = $q.defer();

            api.connect().then(function() {
              $FB.api('/me/friends', function(friends) {
                deferred.resolve(friends);
              });
            }, function() {
              deferred.reject();
            });

            return deferred.promise;
          },

          /**
           * Shows the Post To Wall dialog
           * 
           * @return {promise}
           */
          postToWall: function(settings) {

            var deferred = $q.defer();

            $FB.ui({
              method: 'feed',
              name: settings.headline || "",
              link: settings.link || "",
              picture: settings.picture || "",
              caption: settings.caption || "www.facebook.com",
              description: settings.description || ""
            },
            function(response) {
              if (response && response.post_id) {
                deferred.resolve();
              } else {
                deferred.reject();
              }
            });

            return deferred.promise;
          }
        };

        return api;
      }]
    }
  })

  .run(['$FB', 'Facebook', function($FB, Facebook) {
    // "Forward" appId to $FB service
    $FB.init({
      appId: Facebook.getAppId()
    });
  }]);