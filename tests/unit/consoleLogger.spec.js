'use strict'

const inspect = require('inspect.js')
const sinon = require('sinon')

inspect.useSinon(sinon)

const ConsoleLogger = require('../../')

describe('ConsoleLogger', () => {
  describe('info()', () => {
    let logger
    let loggerStub
    let sandbox

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      logger = new ConsoleLogger({
        noColor: true
      })

      loggerStub = sandbox.stub(logger, 'write')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should log a info log', () => {
      logger.log({
        type: 'info',
        msg: 'Test log',
        data: [123, 456]
      })

      inspect(loggerStub).wasCalledOnce()
      inspect(loggerStub).wasCalledWith('info Test log 123 456\n')
    })

    it('should log a colorized info log', () => {
      logger.colorsEnabled = true
      logger.log({
        type: 'info',
        msg: 'Test log',
        data: [123, 456]
      })

      inspect(loggerStub).wasCalledOnce()
      inspect(loggerStub).wasCalledWith('\u001b[38;5;27minfo\u001b[m: Test log \u001b[38;5;214m123\u001b[m \u001b[38;5;214m456\u001b[m\n')
    })
  })
})
