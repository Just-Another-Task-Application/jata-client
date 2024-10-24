import { atom, } from 'recoil';

import { Signup, } from '../schemas/SignupSchema';

export const signupState = atom<Signup>({
  key: 'signup',
  default: {
    email: '',
    username: '',
    password: '',
  },
});