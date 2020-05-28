import {initializeBlock, TablePickerSynced, useGlobalConfig, useBase, FieldPickerSynced, useRecords} from '@airtable/blocks/ui';
import React, {Fragment, useState} from 'react';

function HelloWorldBlock() {
    const [state, setstate] = useState({displayTwitter: false, twitterData: {}});
    const base = useBase();
    const config = useGlobalConfig();
    const tableId = config.get('tableId');
    const table = tableId ? base.getTableByIdIfExists(tableId) : null;
    const fieldId = table ? config.get('fieldId') : null;
    const field = fieldId ? table.getFieldByIdIfExists(fieldId) : null;
    const records = fieldId ? useRecords(table, {fields: [fieldId]}) : null;

    const onClick = async (e) => {
            if (field.name !== 'twitter') return
			const userRes = await fetch(`http://localhost:5000/twitter?username=${e.target.innerHTML}`, {
				method: 'GET',
			});
            const userData = await userRes.json();
            setstate({...state, displayTwitter: true, twitterData: userData});
    }

    return <Fragment>
        <TablePickerSynced globalConfigKey="tableId" />
        <FieldPickerSynced table={table} globalConfigKey="fieldId" />
        {records && records.map(record => {
            return (
                <div key={record}>
                    <a style={{cursor: 'pointer'}} onClick={onClick}>
                        {record.getCellValueAsString(fieldId)}
                    </a>
                </div>
            )
        })}
        {state.displayTwitter && <Fragment>
            {JSON.stringify(state.twitterData)}
        </Fragment>}
    </Fragment>;
}

initializeBlock(() => <HelloWorldBlock />);
