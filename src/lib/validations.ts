export type ValidationResult = {
  validated: boolean;
  message?: string | null;
};

export const validateUsername = (username: unknown): ValidationResult => {
  if (typeof username !== 'string') {
    return { validated: false, message: 'Username must be a string.' };
  }

  if (username.length < 4 || username.length > 32) {
    return { validated: false, message: 'Username must be between 4 and 32 characters.' };
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return {
      validated: false,
      message: 'Username must only consist of letters, numbers, hyphens, and underscores.',
    };
  }

  return { validated: true };
};

export const validatePassword = (password: unknown): ValidationResult => {
  if (typeof password !== 'string') {
    return { validated: false, message: 'Password must be a string.' };
  }

  if (password.length < 6 || password.length > 255) {
    return { validated: false, message: 'Password must be between 6 and 255 characters.' };
  }

  return { validated: true };
};
