import React from 'react';
import { Text, Box } from '@airtable/blocks/ui';

export const Tweet = ({ tweet }) => {
  let text = tweet.full_text
    .replace(/(http(s)?:\/\/|www.)[A-Za-z0-9]+[A-Za-z0-9\-]*[A-Za-z0-9]*.[A-Za-z0-9]+(:\d{1,5})?(\/\S*)*(\?.+=.+)?(&.+=\s+)*/gm, match => `<a href="${match}" target="_blank">${match}</a>`)
    .replace(/#\w+/gm, match => `<a href="https://twitter.com/hashtag/${match.replace('#', '')}" target="_blank">${match}</a>`)
    .replace(/@\w+/gm, match => `<a href="https://twitter.com/${match.replace('@', '')}" target="_blank">${match}</a>`)
  return (
    <Box
      key={tweet.id}
      style={{
        border: '1px solid red',
        borderRadius: '15px',
        width: '250px',
        padding: '0, 15px',
      }}>
      <div padding='15px' dangerouslySetInnerHTML={{__html: text}}></div>
    </Box>
  );
};
