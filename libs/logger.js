import { NativeModules } from 'react-native';

const hostname = NativeModules.SourceCode.scriptURL.split('://')[1].split('/')[0].split(':')[0]

const logger = (address = hostname, port = 7654, options = { retry: true, timeout: 5000 }) => {
  let numberRetry = 0;
  let queue = [];
  let conn;

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const connect = () => {
    conn = null;
    let ws = new WebSocket(`ws://${address}:${port}`);

    console.log(ws);

    let timeoutHandler = setTimeout(() => {
      conn = null;
      ws.close();
      retryConn();
    }, options.timeout);

    ws.onopen = () => {
      clearTimeout(timeoutHandler);
      conn = ws;

      while (queue.length > 0) {
        conn.send(format(queue.shift()));
      }
    };

    ws.onerror = (e) => {
      console.log(e);
      retryConn();
    }
  }

  const retryConn = async () => {
    if (numberRetry > 0 && !options.retry) {
      return;
    }

    await wait((numberRetry * 500) % 20000);
    numberRetry++;

    connect();
  };

  const format = (value) => {
    switch (typeof value) {
      case 'string':
        value = { type: 'string', payload: value };
        break;
      case 'number':
        value = { type: 'number', payload: value };
        break;
      case 'function':
        value = { type: 'function', payload: value + "" };
        break;
      case 'boolean':
        value = { type: 'boolean', payload: boolean };
        break;
      default:
        if (Array.isArray(value)) {
          value = { type: 'array', payload: value };
        } else {
          value = { type: 'object', payload: value };
        }
    }
    return JSON.stringify(value);
  };

  retryConn();

  return (value) => {
    if (!conn) {
      queue.push(value);
      return;
    }
    conn.send(format(value));
  };
}

export default logger;
