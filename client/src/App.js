import Navbar from './components/Navbar';
import Table from './components/Table';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';

function App() {
  return (
    <>
      <Navbar />
      <Table
       data={[{ uno: 'cato', dos: 'murica' }, { uno: 'ato', dos: 'zurica' }]}
        columns={[
          {
            name: 'uno',
            alias: 'uno'
          },
          {
            name: 'dos',
            alias: 'dos'
          }
        ]}
      />
    </>
  );
}

export default App;
