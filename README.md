# About

Return repository for [Part 10 - React Native](https://fullstackopen.com/en/part10)

## Getting started

1. Clone the course provided server repository ```rate-repository-api``` from [here](https://github.com/fullstack-hy2020/rate-repository-api) and follow the installation instructions found from ```README.md``` file.  
NOTE: In case the installation does not work, please check from below how to fix possible installation problems!

2. Clone this repository and run `yarn install` in the `fullstackopen-reactnative` directory.

3. Edit the `.env` file in the `fullstackopen-reactnative` directory, update the correct IP address for  the ```APOLLO_URI``` variable.

4. Run ```yarn start```.

5. All done!

## Note about the fullstack-hy2020/rate-repository-api

To get the [rate-repository-api](https://github.com/fullstack-hy2020/rate-repository-api) working in the development environment I was using, I had to do the following changes:

1. Updated package.json  
  a. change ```bcrypt```  to ```bcryptjs```   
  b. udpate ```sqlite3``` version

  ```
  $ git diff package.json
  -    "bcrypt": "^3.0.8",
  +    "bcryptjs": "^2.4.3",

  -    "sqlite3": "^4.1.1",
  +    "sqlite3": "^5.0.0",
  ```

2. Updated files importing bcrypt 
```
$ git diff src/graphql/mutations/authorize.js
diff --git a/src/graphql/mutations/authorize.js b/src/graphql/mutations/authorize.js
-import bcrypt from 'bcrypt';
+import bcrypt from 'bcryptjs';
```

```
$ git diff src/graphql/mutations/createUser.js
diff --git a/src/graphql/mutations/createUser.js b/src/graphql/mutations/createUser.js
-import bcrypt from 'bcrypt';
+import bcrypt from 'bcryptjs';
```

## Development environment

Used development environment:
```
$ cat /etc/lsb-release 
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=20.04
DISTRIB_CODENAME=focal
DISTRIB_DESCRIPTION="Ubuntu 20.04.1 LTS"

$ node -v
v14.15.1
$ npm -v
6.14.8
$ yarn -v
1.22.5
$ expo -V
4.0.8
```

## TODO

The implementation could benefit from refactoring as there are similar or same code used in multiple
different components (e.g. ```src/components/{MyReviews, RepositoryItem, RepositoryItemSingle}.jsx``` that could be extracted to e.g. a common entity. However, for this course work I decided that the current implementation suffices.


## Images of the application

Tested with [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent) app in an Android phone running Android version 10.

### View when the app is first opened

![](./images/1.jpg)

### Sorting the reviewed repositories list

![](./images/2.jpg)

### Filtering the reviewed repositories list
![](./images/3.jpg)

### Sign up form
![](./images/4.jpg)

### Sign in form
![](./images/5.jpg)

### After the user has signed in the user is redirected to repository list view
![](./images/6.jpg)

### Review form
![](./images/7.jpg)

### Single repository view (redirect situation after a successful review was submitted)
![](./images/8.jpg)

### The user's reviews (user: addison)

![](./images/9.jpg)

### Review actions (view, delete)
![](./images/10.jpg)

### Finally, user kalle's reviews view
![](./images/11.jpg)