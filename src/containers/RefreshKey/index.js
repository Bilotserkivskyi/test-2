import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';

import { FORM_NAMES } from '../../constants';
import { isLoaded, getData, isLoading, isError } from '../../utils/store';

import { validate } from '../../validations/refreshKey';
import { refreshKey } from '../../actions/refreshKey';
import { REFRESH_KEY } from '../../constants/fields';

import FormComponent from './Form';

class RefreshKeyContainer extends Component {
  refresh = (form) => {
    const { dispatch } = this.props;
    return dispatch(refreshKey({ key: form[REFRESH_KEY.OLD_KEY] }));
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
    const { data, isDataLoaded, handleSubmit, isDataError, errorMessage } = this.props;

    return (
      <form onSubmit={handleSubmit((form) => this.refresh(form))}>
        <FormComponent
          loaded={isDataLoaded}
          newKey={data.key}
          loading={this.isFormLoading()}
          errorMessage={errorMessage}
          error={isDataError}
          disabled={this.isFormDisabled()}
          data={data}
        />
      </form>
    );
  }
}

const refreshKeyForm = reduxForm({
  form: FORM_NAMES.REFRESH_KEY,
  validate,
});

const mapStateToProps = ({ refreshKey: { data, errorMessage } }) => ({
  errorMessage,
  isDataLoaded: isLoaded(data),
  isDataLoading: isLoading(data),
  isDataError: isError(data),
  data: getData(data, {}),
});

RefreshKeyContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  valid: PropTypes.bool,
  data: PropTypes.object.isRequired,
  submitting: PropTypes.bool,
  isDataLoading: PropTypes.bool,
  isDataLoaded: PropTypes.bool,
  isDataError: PropTypes.bool,
  pristine: PropTypes.bool,
};

export default compose(connect(mapStateToProps), refreshKeyForm)(RefreshKeyContainer);
