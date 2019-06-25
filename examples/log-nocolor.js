const ConsoleLogger = require('../')
const log = new ConsoleLogger({
  level: 'debug',
  timestamp: true,
  uptime: false,
  colors: false
})

log.log({
  time: new Date(),
  uptime: process.uptime(),
  type: 'info',
  msg: 'Test',
  data: [123]
})

log.log({
  time: new Date(),
  uptime: process.uptime(),
  type: 'info',
  msg: 'Test',
  data: [
    123,
    'foo',
    null,
    undefined,
    true,
    false
  ]
})

log.log({
  time: new Date(),
  uptime: process.uptime(),
  type: 'sys',
  msg: 'Array',
  data: [
    ['one', 'two', 'three']
  ]
})

log.log({
  time: new Date(),
  uptime: process.uptime(),
  type: 'sys',
  msg: 'Object',
  data: [
    { one: 'one', two: 'two', three: 3 }
  ]
})

log.log({
  time: new Date(),
  uptime: process.uptime(),
  type: 'error',
  msg: new Error('Shit happens')
})
