# React-Native-Logger

Sync or Async Aware logger for react-native

This Project address couple of issues

- Simple to use
- Group logs
- Filter Logs by name
- Async aware

### Installation (NPM or Yarn)

```bash
npm install react-native-logger --save
```

```bash
yarn add react-native-logger
```

### Usage

```js
import { logger } from 'react-native-logger'
```

There are 3 functions.

#### log: (...args: Array<any>) => void

similar to `console.log`. for example 

``` js
logger.log('this is awesome', 10, 10)

// logs as
// this is awesome 10 10
```

#### group: (name: string, title: string, log: LogFn) => void

it accepts 3 arguments. `name` is an identifier which you can use in `setFilters`. `title` is a simple description about the log it self. and `log` is a function which your loggin happening. The signiture of LogFn is 

```js
type LogFn: (log: (...args: Array<any>) => void) => void | Promise<any>
```

It basically group related logs into one. also you can return a promise which cause the logs waits until you tell it so.

```js
logger.group('api', 'loads users list', async (log) => {
  
  const users = await apis.getAllUsers();

  log('list of users', users);

  actions.updateUsersList(users);
});
```

#### setFilters: (...names: Array<string>): void

simply filters out everything except those names that you pass to logs. to clear the filter simply call it without arguments.

```js
logger.filters('api')
```

cheers,

