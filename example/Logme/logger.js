import logger from 'react-native-logger';

const noop = () => {};

const initLogger = () => {
  if (process.env.NODE_ENV !== 'production') {
    return logger();
  }
  return noop;
}

export default initLogger();
