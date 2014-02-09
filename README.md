# angular-fblib
A useful set of functions for interacting with Facebook provided as an angular service. Depends on the excellent angular-easyfb module by pc035860 (https://github.com/pc035860/angular-easyfb).

## Installation
To install FBLib clone the repo and install angular-easyfb via Bower:

```
git clone git@github.com:lieberkind/angular-fblib.git
cd angular-fblib
bower install
```

## Configuration
Add angular-fblib as a dependency to your module. In the config function, use $FBProvider.setInitParams to set your Facebook app's id and FacebookProvider.setScope to set any permissions needed by your app which are not in the basic permissions.

```javascript
angular.module('myApp', ['angular-fblib'])
  .config(['$FBProvider', 'FacebookProvider', function($FBProvider, FacebookProvider) {
    $FBProvider.setInitParams({
      appId: "123456789101112"
    });
    
    FacebookProvider.setScope(['email', 'user_birthday']);
  }]);
```

If your app only needs basic permissions you can leave out the latter.

