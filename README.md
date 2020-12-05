# About

Return repository for [Part 10 - React Native](https://fullstackopen.com/en/part10)

## Images of the application

TBD

## Getting started

1. Clone the course provided server repository ```rate-repository-api``` from [here](https://github.com/fullstack-hy2020/rate-repository-api) and follow the installation instructions found from ```README.md``` file.  
NOTE: In case the installation does not work please check from below how to fix possible installation problems!

2. Clone this repository and run `yarn install` in the `fullstackopen-reactnative` directory.

3. Edit the `.env` file in the `fullstackopen-reactnative` directory, update the correct IP address for  the ```APOLLO_URI``` variable.

4. Run ```yarn start```.

5. All done!


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
```

## Note about the fullstack-hy2020/rate-repository-api

To get the [rate-repository-api](https://github.com/fullstack-hy2020/rate-repository-api) working in the development environment I was using I had to do the following changes:

1. package.json  
  a. changed ```bcrypt```  to ```bcryptjs```   
  b. updated ```sqlite3``` version

  ```
  $ git diff package.json
  -    "bcrypt": "^3.0.8",
  +    "bcryptjs": "^2.4.3",

  -    "sqlite3": "^4.1.1",
  +    "sqlite3": "^5.0.0",
  ```

2. update files importing bcrypt 
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

