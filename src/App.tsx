import logo from './logo.svg';
import './App.css';
import { UpDataGrid, UpBox } from '@up-group-ui/react-controls';

const data: any[] = [];
for (var i = 0; i < 50; i++) {
  data.push({
    c1: 'Value ' + i,
    c2: false,
    c3: 'Value 3',
    c4: { Libelle: 'Suivi', Couleur: '#369' },
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <UpBox></UpBox>
      {/* <UpDataGrid
        isPaginationEnabled={false}
        isSelectionEnabled={false}
        isSortEnabled={false}
        columns={[
          {
            label: 'Col 1',
            field: 'c1',
            isSortable: true,
          },
          {
            label: 'Col 2',
            field: 'c2',
            type: 'boolean',
            isSortable: true,
          },
          {
            label: 'Col 3',
            field: 'c3',
            isSortable: true,
          },
          {
            label: 'Col 4',
            field: 'c4',
            isSortable: true,
          },
        ]}
        data={data}
      /> */}
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </div>
  );
}

export default App;
