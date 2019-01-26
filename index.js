'use strict'

const util = require('util')
const colorfy = require('colorfy')

class ConsoleLogger {
  constructor (conf) {
    conf = conf || {}
    this.colorsEnabled = conf.colors === undefined ? process.stdout.isTTY : !!conf.colors
    this.template = conf.template || 'default'
    this.timestamp = conf.timestamp || false
    this.uptime = conf.uptime || false

    this.__levels = {
      'debug': {
        color: '255',
        labelColor: '248',
        text: 'debug'
      },
      'info': {
        color: '255',
        labelColor: '27',
        text: 'info'
      },
      'req': {
        color: '255',
        labelColor: '82',
        text: 'req'
      },
      'res': {
        color: '255',
        labelColor: '110',
        text: 'res'
      },
      'warn': {
        color: '255',
        labelColor: '202',
        text: 'warn'
      },
      'error': {
        color: '196',
        labelColor: '196',
        text: 'error'
      },
      'sys': {
        color: '250',
        labelColor: '33',
        text: 'sys'
      }
    }
  }

  log (msg) {
    const data = msg.data || ''
    const text = msg.msg
    const type = msg.type

    const indent = type.length + 2

    const cf = colorfy()
    const typeColor = this.__levels[type].labelColor
    if (this.template === 'minimal') {
      cf.ansi(typeColor, '▊', 'ltrim')
      if (this.timestamp) {
        cf.dgrey(msg.time.toISOString().slice(11, -1)).ansi(typeColor, '▐ ')
      }

      if (this.uptime) {
        cf.dgrey(msg.uptime).ansi(typeColor, '▐ ')
      }

      cf.txt(text)
    } else {
      if (this.timestamp) {
        cf.dgrey(msg.time.toISOString().slice(11, -1)).txt(' ')
      }

      if (this.uptime) {
        cf.dgrey(msg.uptime).txt(' ')
      }

      cf.ansi(typeColor, type, 'ltrim').txt(': ').txt(text)
    }
    if (data.length > 0) {
      for (let d of msg.data) {
        const dataStr = this.stringify(d, indent)
        cf.txt(' ' + dataStr.colorfy(this.colorsEnabled))
      }
    }

    const l = cf.nl().colorfy(this.colorsEnabled)
    this.write(l)
  }

  colorifyType (type) {
    var col = this.__levels[type].labelColor
    if (col && this.colorsEnabled) {
      type = `\u001b[38;5;${col}m${this.__levels[type].text}\u001b[m:`
    }

    return type
  }

  colorifyMsg (msg) {
    return msg
  }

  stringify (data, indent) {
    const cf = colorfy()

    switch (typeof data) {
      case 'string':
        // data = '\u001b[38;5;250m"' + data + '"\u001b[m'
        cf.lgrey(data)
        break
      case 'object':
        if (data === null) {
          // data = nl + ' \u001b[38;5;33mnull\u001b[m'
          cf.lime('null')
        } else {
          cf.txt(util.inspect(data, { showHidden: false, depth: null, colors: true }))
        }
        break
      case 'undefined':
        // data = ' \u001b[38;5;201mundefined\u001b[m'
        cf.ored('undefined')
        break
      case 'boolean':
        // data = ' ' + (data ? '\u001b[38;5;201mtrue' : '\u001b[38;5;201mfalse') + '\u001b[m'
        cf.ored(data ? 'true' : 'false')
        break
      case 'number':
        // data = ' \u001b[38;5;214m' + String(data) + '\u001b[m'
        cf.yellow(String(data))
        break
      case 'function':
        // data = ' \u001b[38;5;148m' + data.toString() + '\u001b[m'
        cf.pink('Function: ' + data.toString())
        break
    }

    return cf
  }

  flush () {
    return Promise.resolve()
  }

  write (msg) {
    process.stdout.write(msg)
  }
}

module.exports = ConsoleLogger
