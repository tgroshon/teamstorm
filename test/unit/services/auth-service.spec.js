'use strict'
var spyquire = require('spyquire')
var spies = spyquire('../../../server/services/auth-service')
spies.with('bcrypt').nick('bcrypt')
    .with('jwt-simple').nick('jwt')

var service = spies.exec()

describe('Auth-Service', () => {

  it('decodes a token', () => {

  })

  it('encodes data into a token', () => {

  })

  it('compares a password and hash', () => {

  })

  it('hashes a password', () => {

  })
})

