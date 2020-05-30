import {
  initializeBlock,
  TablePickerSynced,
  useGlobalConfig,
  useBase,
  FieldPickerSynced,
  TablePicker,
  FieldPicker,
} from '@airtable/blocks/ui';
import React, { Fragment, useState } from 'react';
import { Records } from './components/Records';
import { DisplayInfo } from './components/DisplayInfo';

function HelloWorldBlock() {
  const initialState = {
    display: false,
    data: {},
  };
  const [state, setState] = useState(initialState);
  const [table, setTable] = useState(null);
  const [field, setField] = useState(null);

  return (
    <Fragment>
      <TablePicker
        table={table}
        onChange={(newTable) => {
          setState(initialState);
          setField(null);
          setTable(newTable);
        }}
      />
      <FieldPicker
        table={table}
        field={field}
        onChange={(newField) => {
          setState(initialState);
          setField(newField);
        }}
      />
      {field && (
        <Records
          table={table}
          field={field}
          state={state}
          setstate={setState}
        />
      )}
      {state.display && <DisplayInfo field={field} state={state} />}
    </Fragment>
  );
}

initializeBlock(() => <HelloWorldBlock />);
