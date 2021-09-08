# AWS PARAMETER STORE ENV CONFIG


It allows you to configure your environment variable file in seconds and to be able to quickly switch between environments

## <a name="installation-and-usage"></a>Installation and Usage

Prerequisites: [Node.js](https://nodejs.org/) (`^10.12.0`, or `>=12.0.0`) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)

You can install aws-parameter-store-env-manager using npm:

```
$ npm install aws-parameter-store-env-manager --save-dev
```

You can also install with `yarn`

```
$ yarn add -D aws-parameter-store-env-manager
```

## <a name="configuration"></a>Configuration

You need to create a `envconfig.js` file in your root directoy with structure like:

```javascript
module.exports = {
  filePath: '.env',
  envs: [
    { name: 'development', paths: ['/path/common/', '/path/development'] },
    { name: 'staging', paths: ['/path/common/', '/path/staging'] },
    { name: 'production', paths: ['/path/common/', '/path/production'] },
  ],
};
```

* `filePath:` The name of your file
* `envs` Define your environments like `development`, `staging`, `production`or whatever you use
  * `name` The name of the environment
  * `paths` the paths that will define the environment and will be downloaded recursively     
    

To find how to set up your environments in AWS Parameter Store check this documentation
https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html


### Usage

You can use directly in you project repository 

```
npx env-manager configure
```

To use without interactive console you could directly pass the `index` param or `name` of the param e.g.

```javascript
module.exports = {
  filePath: '.env',
  envs: [
    { name: 'development', paths: ['/path/common/', '/path/development'] },
    { name: 'production', paths: ['/path/common/', '/path/production'] },
  ],
};
```

```
npx env-manager configure 1 // default select development environment
npx env-manager configure 2 // default select production environment
npx env-manager configure development // default select development environment
npx env-manager configure production // default select production environment
```
