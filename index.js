// @flow

type groupLogFn = (...args: Array<any>) => void

const isDebugEnabled = global && typeof global.__DEV__ !== 'undefined' && !!global.__DEV__

const noop = () => {}
const displayLogs = (name: string, title: string, logs: Array<Array<any>>, show: boolean) => {
  if (!show) {
    return
  }

  if (console.groupCollapsed) {
    console.groupCollapsed(`${name}: ${title}`)
  }

  for (var i = 0; i < logs.length; i++) {
    console.log(...logs[i])
  }

  if (console.groupEnd){
    console.groupEnd()
  }
}

let filters: Array<string> = []

export const logger = {
  setFilters: (...names: Array<string>): void => {
    filters = names
  },
  log: (...args: Array<any>): void => {
    isDebugEnabled && console.log(...args)
  },
  group: (name: string, title: string, logFn: (log: groupLogFn) => void | Promise<any> = noop) => {
    const show = filters.length === 0 || filters.indexOf(name) !== -1

    const logs: Array<any> = []
    const done = logFn((...args: Array<any>): void => {
      if (isDebugEnabled && show) {
        logs.push(args)
      }
    })

    if (done instanceof Promise) {
      done.then(() => {
        displayLogs(name, title, logs, show)
      }).catch(() => {
        displayLogs(name, title, logs, show)
      })
    } else {
      displayLogs(name, title, logs, show)
    }
  }
}
