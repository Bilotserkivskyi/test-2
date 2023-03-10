import api, { setAutorization } from '../utils/request';
import { redirect } from '../utils/navigation';
import { convertLoginData } from '../api/login';

import URLS from '../constants/api';
import ROUTES from '../constants/routes';
import { LOGIN } from '.';

export const logOut = () => {
  setAutorization(null);
  redirect(ROUTES.LOGIN, { local: false });
};

const loginFail = (message) => ({
  type: LOGIN.FAIL,
  message,
});

const loginLoading = () => ({
  type: LOGIN.LOADING,
});

const loginSuccess = (token) => ({
  type: LOGIN.SUCCESS,
  token,
});

export const login = (actionData) => {
  return (dispatch) => {
    dispatch(loginLoading());
    const payload = convertLoginData(actionData);
    return api
      .post(URLS.LOGIN, payload)
      .then(({ data }) => {
        setAutorization(data.accessToken);
        redirect(ROUTES.HOME);

        return dispatch(loginSuccess(data.accessToken));
      })
      .catch(({ response: { data } }) => dispatch(loginFail(data.message)));
  };
};
