import React, { Fragment } from 'react';
import { useRecords, Text, Box } from '@airtable/blocks/ui';

export const Records = ({ table, field, state, setstate }) => {
  const records = field.id ? useRecords(table, { fields: [field.id] }) : null;

  const onClick = async (e) => {
    const userRes = await fetch(
      `http://localhost:5000/${field.name.toLowerCase()}?username=${
        e.target.innerHTML
      }`,
      {
        method: 'GET',
      }
    );
    const userData = await userRes.json();
    setstate({ display: true, data: userData });
  };

  return (
    <Fragment>
      {records &&
        records.map((record) => {
          return (
            <Box
              key={record.id}
              display='fex'
              alignItems='center'
              justifyContent='center'
              border='default'
              backgroundColor='lightGray1'
              padding={0}
              borderRadius={5}>
              <a style={{ cursor: 'pointer' }} onClick={onClick}>
                <Text>{record.getCellValueAsString(field.id)}</Text>
              </a>
            </Box>
          );
        })}
    </Fragment>
  );
};
