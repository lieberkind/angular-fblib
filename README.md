# angular-fblib
A useful set of functions for interacting with Facebook provided as an angular service. Depends on the excellent angular-easyfb module by pc035860 (https://github.com/pc035860/angular-easyfb).

## Installation
Clone the repo and install angular-easyfb via Bower:

```
git clone git@github.com:lieberkind/angular-fblib.git
cd angular-fblib
bower install
```

## Getting started
Include angular-easyfb and angular-fblib scripts:

```html
<script src="path/to/angular-easyfb.min.js"></script>
<script src="path/to/angular-fblib.js"></script>
```

Add fblib as a dependency to your module:

```js
angular.module('myApp', ['fblib']);
```

## Configuration
In the config function, use FacebookProvider.settings() to set your Facebook app's id and any permissions needed by your app which are not in the basic permissions.

```js
angular.module('myApp', ['fblib'])
  .config(['FacebookProvider', function(FacebookProvider) {

    FacebookProvider.settings({
      appId: "123456789101112",
      scope: ['email', 'user_birthday']
    });
  
  }]);
```

If your app only needs basic permissions set the scope to an empty array.

## Usage
All methods return promises.

#### connect()
Logs in with the permissions provided in the config function.
```js
Facebook.connect().then(function() {
  console.log('Connected!');
});
```

#### getUser(fields)
Gets the logged in user with the specified fields

```js
Facebook.getUser(['first_name', 'last_name']).then(function(user) {
  console.log('Your name is: ' + user.first_name + " " + user.last_name);
});
```

#### getUserFriends()
Gets the logged in user's friends

```js
Facebook.getUserFriends().then(function(friends) {
  // Handle friends...
});
```
