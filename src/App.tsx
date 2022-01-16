import { UpCodeViewer, UpDataGrid } from '@up-group-ui/react-controls';
import { useState } from 'react';

const data: any[] = [];
for (var i = 0; i < 5; i++) {
  data.push({
    c1: 'Value ' + i,
    c2: false,
    c4: { Libelle: 'Suivi', Couleur: '#369' },
    id: i,
  });
}

class SpecifiqueCellFormatter {
  format(item, column, additionalProps) {
    // console.log('additionalProps', additionalProps)
    return <EditableCell column={column} item={item} applyChanges={additionalProps}></EditableCell>;
  }
}

const EditableCell = ({ item, column: { field }, applyChanges }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(item[field]);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    item[field] = value;
    applyChanges(item);
  };
  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

function App() {
  const [datas, setDatas] = useState(data);
  const applyChanges = (value) => (item) => {
    const copyDatas = [...datas];
    copyDatas[datas.findIndex((x) => x.id === item.id)] = item;
    setDatas(copyDatas);
  };
  return (
    <div className="App">
      <UpDataGrid
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
            formatter: new SpecifiqueCellFormatter(),
            getFormatterProps: applyChanges,
            isSortable: true,
          },
          {
            label: 'Col 4',
            field: 'c4',
            isSortable: true,
          },
        ]}
        data={datas}
      />
      <UpCodeViewer language="json" code={JSON.stringify(datas, null, 2)} height={'auto'}></UpCodeViewer>
    </div>
  );
}

export default App;
