import {
  initializeBlock,
  useWatchable,
  useLoadable,
  useBase,
  useRecordById,
  useRecords,
} from '@airtable/blocks/ui';
import { cursor } from '@airtable/blocks';
import React, { Fragment, useState } from 'react';
import { Field } from './components/Field';
// import { DisplayInfo } from './components/DisplayInfo';

function HelloWorldBlock() {
  const base = useBase();
  const initialState = {
    display: false,
    data: {},
  };
  const [state, setState] = useState(initialState);
  useLoadable(cursor);
  useWatchable(cursor, [
    'activeTableId',
    'selectedFieldIds',
    'selectedRecordIds',
  ]);
  const table = base.getTableById(cursor.activeTableId);
  const fields = cursor.selectedFieldIds.map((fieldId) =>
    table.getFieldById(fieldId)
  );
  const queryResult = table.selectRecords();
  const records = useRecords(queryResult);
  return (
    <Fragment>
      {fields &&
        fields.map((field) => (
          <Field
            key={field.id}
            cursor={cursor}
            records={records}
            field={field}
            setState={setState}
          />
        ))}
      {/* {state.display && <DisplayInfo field={field} state={state} />} */}
    </Fragment>
  );
}

initializeBlock(() => <HelloWorldBlock />);
