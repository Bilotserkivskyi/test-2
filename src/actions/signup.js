import api from '../utils/request';
import { redirect } from '../utils/navigation';
import { convertSignupData } from '../api/signup';
import URLS from '../constants/api';
import ROUTES from '../constants/routes';
import { SIGNUP } from '.';

const signupFail = (message) => ({
  type: SIGNUP.FAIL,
  message,
});

const signupSuccess = (key) => ({
  type: SIGNUP.SUCCESS,
  key,
});

export const signup = (signupData) => {
  const payload = convertSignupData(signupData);

  return (dispatch) =>
    api
      .post(URLS.SIGNUP, payload)
      .then(({ data }) => {
        redirect(ROUTES.SIGNUP_SUCCESS);
        return dispatch(signupSuccess(data.key));
      })
      .catch(({ response: { data } }) => dispatch(signupFail(data.message)));
};