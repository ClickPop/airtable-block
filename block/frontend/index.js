import {
  initializeBlock,
  TablePickerSynced,
  useGlobalConfig,
  useBase,
  FieldPickerSynced,
} from '@airtable/blocks/ui';
import React, { Fragment, useState } from 'react';
import { Records } from './components/Records';

function HelloWorldBlock() {
  const initialState = {
    displayTwitter: false,
    twitterData: {},
  };
  const [state, setstate] = useState(initialState);
  const base = useBase();
  const config = useGlobalConfig();
  const tableId = config.get('tableId');
  const table = tableId ? base.getTableByIdIfExists(tableId) : null;
  const fieldId = table ? config.get('fieldId') : null;
  const field = fieldId ? table.getFieldByIdIfExists(fieldId) : null;

  return (
    <Fragment>
      <TablePickerSynced
        globalConfigKey='tableId'
        onChange={() => setstate(initialState)}
      />
      <FieldPickerSynced
        table={table}
        globalConfigKey='fieldId'
        onChange={() => setstate(initialState)}
      />
      {field && (
        <Records
          table={table}
          field={field}
          state={state}
          setstate={setstate}
        />
      )}
      {state.displayTwitter && (
        <Fragment>{JSON.stringify(state.twitterData)}</Fragment>
      )}
    </Fragment>
  );
}

initializeBlock(() => <HelloWorldBlock />);
