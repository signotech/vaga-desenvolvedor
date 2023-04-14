import React from 'react';
import { ThemeProvider } from 'styled-components';
import Layout from '../Layout';

import Global from '../../styles/Global';
import _default from '../../styles/themes/default';

export default function App() {
  return (
    <ThemeProvider theme={_default}>
      <Global />
      <Layout />
    </ThemeProvider>
  );
}
