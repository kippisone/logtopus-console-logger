const ConsoleLogger = require('../')
const log = new ConsoleLogger({
  level: 'debug'
})

log.log({
  type: 'info',
  msg: 'Test',
  data: [123]
})

log.log({
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
  type: 'sys',
  msg: 'Array',
  data: [
    ['one', 'two', 'three']
  ]
})

log.log({
  type: 'sys',
  msg: 'Object',
  data: [
    { one: 'one', two: 'two', three: 3 }
  ]
})

log.log({
  type: 'error',
  msg: new Error('Shit happens')
})
