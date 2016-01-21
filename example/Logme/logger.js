import logger from 'react-native-logger';

const noop = () => {};

const initLogger = () => {
  if (process.env.NODE_ENV !== 'production') {
    return logger('localhost') //for android make sure you use your ip addtess e.g '192.168.1.110'
  }
  return noop;
}

export default initLogger();
