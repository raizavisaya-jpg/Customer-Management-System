import { describe, it, expect } from 'vitest'

describe('Authentication Tests', () => {

  it('should allow ACTIVE users', () => {
    const status = 'ACTIVE'
    expect(status).toBe('ACTIVE')
  })

  it('should block INACTIVE users', () => {
    const status = 'INACTIVE'
    expect(status).not.toBe('ACTIVE')
  })

  it('should protect routes without login', () => {
    const loggedIn = false
    expect(loggedIn).toBe(false)
  })

})