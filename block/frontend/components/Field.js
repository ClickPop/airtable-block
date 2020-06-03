import React, { Fragment } from 'react';
import { Record } from './Record';
import { Text } from '@airtable/blocks/ui';

export const Field = ({ records, cursor, field, setState }) => {
  return (
    <Fragment>
      <Text>{field.name}</Text>
      {records &&
        records
          .filter((record) => cursor.selectedRecordIds.includes(record.id))
          .map((record) => (
            <Record
              key={record.id}
              record={record}
              field={field}
              setState={setState}
            />
          ))}
    </Fragment>
  );
};
