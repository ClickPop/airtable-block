import React, { Fragment } from 'react';
import { useRecords } from '@airtable/blocks/ui';

export const Records = ({ table, field, state, setstate }) => {
  const records = field.id ? useRecords(table, { fields: [field.id] }) : null;

  const onClick = async (e) => {
    if (field.name !== 'twitter') return;
    const userRes = await fetch(
      `http://localhost:5000/twitter?username=${e.target.innerHTML}`,
      {
        method: 'GET',
      }
    );
    const userData = await userRes.json();
    setstate({ ...state, displayTwitter: true, twitterData: userData });
  };

  return (
    <Fragment>
      {records &&
        records.map((record) => {
          return (
            <div key={record}>
              <a style={{ cursor: 'pointer' }} onClick={onClick}>
                {record.getCellValueAsString(field.id)}
              </a>
            </div>
          );
        })}
    </Fragment>
  );
};
