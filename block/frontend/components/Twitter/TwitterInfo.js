import React, { Fragment } from 'react';
import { Box, Text, Heading } from '@airtable/blocks/ui';
import { Tweet } from './Tweet';

export const TwitterInfo = ({ state }) => {
  const user = state.twitterData.user[0];
  const tweets = state.twitterData.tweets;

  return (
    <Fragment>
      <Box>
        <Heading>Name</Heading>
        <Text>{user.name}</Text>
        <Heading>Followers</Heading>
        <Text>{user.followers_count}</Text>
        <Heading>Description</Heading>
        <Text>{user.description}</Text>
      </Box>
      <Box>
        <Heading>Tweets</Heading>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </Box>
    </Fragment>
  );
};
