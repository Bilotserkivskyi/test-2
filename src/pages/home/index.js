import React, { Component } from 'react';

import { Page } from '../../components/layouts';
import Head from '../_head';
import { UserRequest, Header } from '../../containers';

import { PAGE_TYPE } from '../../constants/static';
import { headerNavigatePath } from '../../actions/navigation';
import ROUTES from '../../constants/routes';

class HomePage extends Component {
  static async getInitialProps({ store }) {
    store.dispatch(headerNavigatePath(ROUTES.HOME));
  }

  render() {
    return (
      <Page align="center">
        <Head id={PAGE_TYPE.HOME} />
        <Header />
        <UserRequest />
      </Page>
    );
  }
}

export default HomePage;
