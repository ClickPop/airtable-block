import React, { Fragment } from 'react';
import { useRecordById } from '@airtable/blocks/ui';
import { Record } from './Record';

export const Field = ({ cursor, table, field, setState }) => {
  const records = cursor.selectedRecordIds.map((recordId) =>
    useRecordById(table, recordId)
  );
  console.log(records);
  return (
    <Fragment>
      {records &&
        records.map(
          (record) =>
            record.id
            // <Record
            //   key={record.id}
            //   record={record}
            //   field={field}
            //   setstate={setState}
            // />
        )}
    </Fragment>
  );
};
