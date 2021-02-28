import { isEmail, isEmpty, isUrl, isValid } from './Validators';

describe('validation should return proper values', () => {
  test('email is valid as correct', () => {
    const email = 'proper-email@example.com';
    const email_2 = 'proper-email.example@example.com';
    const email_3 = 'proper.email.example@example.test.com';
    expect(isEmail(email)).toBeTruthy();
    expect(isEmail(email_2)).toBeTruthy();
    expect(isEmail(email_3)).toBeTruthy();
  })

  test('should return false when email is not proper', () => {
    const email = 'this is not valid email'
    expect(isEmail(email)).toBeFalsy();
  })

  test('should return false for not proper url', () => {
    const url = 'it is not url'
    expect(isUrl(url)).toBeFalsy();
  })

  test('should return true for proper url', () => {
    const url = 'www.wikipedia.com';
    const url_2 = 'google.com';
    const url_3 = 'http://google.com';
    const url_4 = 'https://google.com';
    expect(isUrl(url)).toBeTruthy();
    expect(isUrl(url_2)).toBeTruthy();
    expect(isUrl(url_3)).toBeTruthy();
    expect(isUrl(url_4)).toBeTruthy();
  })

  test('should return true for existed value', () => {
    const text = 'some text';
    expect(isEmpty(text)).toBeTruthy();
  })

  test('should return false for empty value', () => {
    const text = '';
    expect(isEmpty(text)).toBeFalsy();
  })

});

describe('complex validation verification', () => {
  test('values are proper', () => {
    expect(isValid('John', 'name')).toBeTruthy();
    expect(isValid('www.picture.com', 'avatar')).toBeTruthy();
    expect(isValid('example@email.com', 'email')).toBeTruthy();
  })

  test('values are not correct', () => {
    expect(isValid('', 'name')).toBeFalsy();
    expect(isValid('picture.', 'avatar')).toBeFalsy();
    expect(isValid('exampleemail.com', 'email')).toBeFalsy();
  })

  test('email are not correct', () => {
    expect(isValid('John', 'name')).toBeTruthy();
    expect(isValid('www.picture.com', 'avatar')).toBeTruthy();
    expect(isValid('com', 'email')).toBeFalsy();
  })
})
