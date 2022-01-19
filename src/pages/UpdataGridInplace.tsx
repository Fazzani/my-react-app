import { useState, useEffect } from 'react';
import { UpCodeViewer, UpDataGrid, UpSelect, UpInput } from '@up-group-ui/react-controls';
import '../App.css';
import { Link } from 'react-router-dom';

const data: any[] = [];
for (var i = 0; i < 3; i++) {
  data.push({
    c1: 'Value ' + i,
    c2: false,
    genre: '',
    c4: { Libelle: 'Suivi', Couleur: '#369' },
    id: i,
  });
}

class EditableCellCellFormatter {
  format(item, column, additionalProps) {
    return <EditableCell column={column} item={item} applyChanges={additionalProps}></EditableCell>;
  }
}

const EditableCell = ({ item, column: { field }, applyChanges: { apply, type } }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(item[field]);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    item[field] = value;
    apply(item);
  };

  useEffect(() => {
    if (type === 'select') {
      onBlur();
    }
  }, [type, value]);

  if (type === 'select')
    return (
      <UpSelect
        isRequired={true}
        allowClear={true}
        default={2}
        multiple={false}
        returnType={'id'}
        valueKey={'id'}
        tooltip="Genre"
        data={[
          { id: 1, text: 'M.' },
          { id: 2, text: 'Mme' },
          { id: 3, text: 'Mlle' },
          { id: 4, text: 'Dr' },
        ]}
        onChange={onChange}
      />
    );
  return <UpInput value={value} onChange={onChange} onBlur={onBlur} className="auto-width" />;
};

function UpdataGridInplace() {
  const [datas, setDatas] = useState(data);

  const applyChanges = (value) => ({
    apply: (item) => {
      const copyDatas = [...datas];
      copyDatas[datas.findIndex((x) => x.id === item.id)] = item;
      setDatas(copyDatas);
    },
    type: 'input',
  });

  const applyChanges2 = (value) => ({
    apply: (item) => {
      const copyDatas = [...datas];
      copyDatas[datas.findIndex((x) => x.id === item.id)] = item;
      setDatas(copyDatas);
    },
    type: 'select',
  });

  return (
    <>
      <nav>
        <Link to="/updatagrid2">UpDataGrid2</Link>
      </nav>
      <main>
        <UpDataGrid
          onSelectionChange={(a, b) => {
            console.log(a, b);
          }}
          isPaginationEnabled={true}
          isSelectionEnabled={true}
          isSortEnabled={true}
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
              formatter: new EditableCellCellFormatter(),
              getFormatterProps: applyChanges,
              isSortable: true,
            },
            {
              label: 'Genre',
              field: 'genre',
              formatter: new EditableCellCellFormatter(),
              getFormatterProps: applyChanges2,
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
      </main>
    </>
  );
}

export default UpdataGridInplace;
