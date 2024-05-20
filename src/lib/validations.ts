type ValidationResult = [boolean, string];

export const validateUsername = (username: unknown): ValidationResult => {
  if (typeof username !== 'string') {
    return [false, 'Username must be a string.'];
  }

  if (username.length < 4 || username.length > 32) {
    return [false, 'Username must be between 4 and 32 characters.'];
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return [false, 'Username must only consist of letters, numbers, hyphens, and underscores.'];
  }

  return [true, ''];
};

export const validatePassword = (password: unknown): ValidationResult => {
  if (typeof password !== 'string') {
    return [false, 'Password must be a string.'];
  }

  if (password.length < 6 || password.length > 255) {
    return [false, 'Password must be between 6 and 255 characters.'];
  }

  return [true, ''];
};
