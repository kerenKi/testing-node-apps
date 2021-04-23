// Testing Pure Functions

// 🐨 import the function that we're testing
import {isPasswordAllowed} from '../auth'

// 🐨 write tests for valid and invalid passwords
// 💰 here are some you can use:
//
// valid:
// - !aBc123
//
// invalid:
// - a2c! // too short
// - 123456! // no alphabet characters
// - ABCdef! // no numbers
// - abc123! // no uppercase letters
// - ABC123! // no lowercase letters
// - ABCdef123 // no non-alphanumeric characters

describe('Passwords validity', () => {
  test('Except valid password', () => {
    const validPassword = '!Abc134'
    expect(isPasswordAllowed(validPassword)).toBe(true)
  })

  test('Do not except password without digits', () => {
    const invalidPassword = '!Abchjbj'
    expect(isPasswordAllowed(invalidPassword)).toBe(false)
  })
  test('Do not except password without symbols', () => {
    const invalidPassword = '234kjbAbc134'
    expect(isPasswordAllowed(invalidPassword)).toBe(false)
  })
  test('Do not except password without capital letter', () => {
    const invalidPassword = '!iubc134fdg?;'
    expect(isPasswordAllowed(invalidPassword)).toBe(false)
  })
  test('Do not except password without small letter', () => {
    const invalidPassword = 'FVGT!134?;'
    expect(isPasswordAllowed(invalidPassword)).toBe(false)
  })
})
