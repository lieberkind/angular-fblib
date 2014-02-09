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
    var _scope = [];

    return {

      /*
      |------------------------------------------------
      | Setters
      |------------------------------------------------
       */
      setScope: function(scope) {
        _scope = scope;
      },

      /*
      |------------------------------------------------
      | $get
      |------------------------------------------------
       */
      $get: ['$FB', '$q', function($FB, $q) {

        var api = {

          /**
           * Connect to Facebook with the given permissions
           * 
           * @return promise
           */
          connect: function() {
            var deferred = $q.defer();

            $FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                deferred.resolve();
              } else {
                var scope_string = _scope.join();

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
           * @return promise object
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
           * @return promise object
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
           * @return promise object
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
  });