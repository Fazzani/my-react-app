import { useState, FC, useEffect } from 'react';
import { UpCodeViewer, UpDataGrid, UpInput, withTheme, WithThemeProps } from '@up-group-ui/react-controls';
import '../App.css';
import { Link } from 'react-router-dom';
import UpPopover from '../components/UpPopover/UpPopover';

const data: any[] = [];
for (var i = 0; i < 3; i++) {
  data.push({
    benef: 'Benef ' + i,
    vn: '',
    ps: '',
    id: i,
  });
}

class EditableCellFormatter {
  format(item, column, additionalProps) {
    return <EditableCell column={column} item={item} {...additionalProps}></EditableCell>;
  }
}

const EditableCell = ({ item, column, apply, type, applyForAll, displayApplyForAll }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(item[column.field]);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    item[column.field] = value;
    apply(item);
  };

  // update value when is externally updated ('Apply for all', in our case)
  useEffect(() => {
    if (item[column.field] !== value) setValue(item[column.field]);
  }, [item[column.field]]);

  const onApplyForAll = () => {
    item[column.field] = value;
    applyForAll(item, column.field);
  };

  //TODO: change it to label when input loose focus
  //TODO: fix styles from theme
  //TODO: gérer le dismiss pr que la popin ne soit plus affichée
  if (displayApplyForAll)
    return (
      <UpPopover buttonTitle={'Appliquer'}  title={'Appliquer sur toute la colonne?'} disabled={value == null || value === ''} onSave={onApplyForAll}>
        <UpInput value={value} onChange={onChange} onBlur={onBlur} />
      </UpPopover>
    );
  return <UpInput value={value} onChange={onChange} onBlur={onBlur} className="auto-width" />;
};

const UpdataGridInplace2: FC<WithThemeProps> = ({ theme }) => {
  const [datas, setDatas] = useState(data);
  const [isApplyForAllCalled, setIsApplyForAllCalled] = useState(false); //TODO: à gérer par colonne

  const applyChanges = (value) => ({
    apply: (item) => {
      const copyDatas = [...datas];
      copyDatas[datas.findIndex((x) => x.id === item.id)] = item;
      setDatas(copyDatas);
    },
    type: 'input',
    applyForAll: (item, c) => {
      const copyDatas = [...datas];
      copyDatas[datas.findIndex((x) => x.id === item.id)] = item;

      setDatas(
        copyDatas.map((i) => {
          const copy = { ...i };
          copy[c] = item[c];
          return copy;
        }),
      );
      setIsApplyForAllCalled(true); //TODO: à gérer par colonne
    },
    displayApplyForAll: !isApplyForAllCalled, //TODO: à gérer par colonne
  });

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
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
              label: 'Benef',
              field: 'benef',
              isSortable: true,
            },
            {
              label: 'Valeur nominale du titre',
              field: 'vn',
              type: 'int',
              formatter: new EditableCellFormatter(),
              getFormatterProps: (value) => applyChanges(value),
              isSortable: true,
            },
            {
              label: 'Nombre de titre',
              field: 'ps',
              type: 'int',
              formatter: new EditableCellFormatter(),
              getFormatterProps: applyChanges,
              isSortable: true,
            },
          ]}
          data={datas}
        />
        <UpCodeViewer language="json" code={JSON.stringify(datas, null, 2)} height={'auto'}></UpCodeViewer>
      </main>
    </>
  );
};

export default withTheme(UpdataGridInplace2);
