# React-Native-Logger

### Installation

inside your project:

```bash
npm install react-native-logger --save
```

also for using the server module

```
npm install react-native-logger -g
```


### Usage

running the server

```bash
# run as a server
react-native-logger
```

running in react-native side

```js
// create a file inside your project logger.js
import logger from 'react-native-logger';

const noop = () => {};

const initLogger = () => {
  if (process.env.NODE_ENV !== 'production') {
    return logger();
  }
  return noop;
}

export default initLogger();
```


then anywhere import this module and use it.

```js
import log from './logger';

log("Hello, It's me, I was wondering...");
```

cheers,
