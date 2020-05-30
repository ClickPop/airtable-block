import React from 'react';
import { Text, Box } from '@airtable/blocks/ui';

export const Tweet = ({ tweet }) => {
  return (
    <Box
      key={tweet.id}
      style={{
        border: '1px solid red',
        borderRadius: '15px',
        width: '250px',
        padding: '0, 15px',
      }}>
      <Text padding='15px'>{tweet.full_text}</Text>
    </Box>
  );
};
