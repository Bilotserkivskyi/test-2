import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';

import { FORM_NAMES } from '../../constants';
import { USER_REQUEST } from '../../constants/fields';
import { isLoaded, getData, isLoading, isError } from '../../utils/store';

import { validate } from '../../validations/userRequest';
import { sendUserRequest } from '../../actions/userRequest';
import Form from './Form';

class UserRequestContainer extends Component {
  send = () => {
    const { dispatch } = this.props;
    return dispatch(sendUserRequest());
  };

  isFormDisabled = () => {
    const { valid, pristine, submitting } = this.props;

    return !valid || pristine || submitting;
  };

  isFormLoading = () => {
    const { submitting, isDataLoading } = this.props;

    return submitting || isDataLoading;
  };

  render() {
    const { data, isDataLoaded, handleSubmit, errorMessage } = this.props;

    return (
      <form onSubmit={handleSubmit((form) => this.send(form))}>
        <Form
          dataLoaded={isDataLoaded}
          loading={this.isFormLoading()}
          errorMessage={errorMessage}
          disabled={this.isFormDisabled()}
          data={data}
        />
      </form>
    );
  }
}

const userRequestForm = reduxForm({
  form: FORM_NAMES.USER_REQUEST,
  validate,
});

const mapStateToProps = ({ userRequest: { data, errorMessage } }) => ({
  errorMessage,
  isDataLoaded: isLoaded(data),
  isDataLoading: isLoading(data),
  isDataError: isError(data),
  data: getData(data, {}),
});

UserRequestContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  isDataLoading: PropTypes.bool,
  isDataLoaded: PropTypes.bool,
  pristine: PropTypes.bool,
};

export default compose(connect(mapStateToProps), userRequestForm)(UserRequestContainer);