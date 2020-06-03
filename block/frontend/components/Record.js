import React, { Fragment } from 'react';
import { Text, Box } from '@airtable/blocks/ui';

export const Record = ({ record, field, setState }) => {
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
    setState({ display: true, data: userData });
  };

  return (
    <Fragment>
      <Box
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
    </Fragment>
  );
};
