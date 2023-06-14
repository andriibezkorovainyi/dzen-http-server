import { CreateUserInput } from '../types/userTypes';

export function validateUserData(data: CreateUserInput) {
  const { userName, email, password, homePage } = data;
  const errors: {
    userName?: string;
    email?: string;
    password?: string;
    homePage?: string;
  } = {};

  if (homePage) {
    try {
      new URL(homePage);
    } catch (err) {
      errors.homePage = 'Home page is not a valid URL';
    }
  }

  if (!userName) {
    errors.userName = 'Username is required';
  } else if (!validateUserName(userName)) {
    errors.userName =
      'Username must be 1-30 characters long and contain only letters, numbers, underscores and dots';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Email is not valid';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password =
      'Password must contain at least 8 characters, one uppercase letter, ' +
      'one lowercase letter, one number and one special character';
  }

  return Object.keys(errors).length ? Object.values(errors) : null;
}

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateUserName(userName: string) {
  const re = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  return re.test(userName);
}

function validatePassword(password: string) {
  const re =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-=?<>,.;:'"[\]{}|]).{8,}$/;
  return re.test(password);
}
