import React, { Fragment } from 'react';
import { Box, Text, Heading } from '@airtable/blocks/ui';
import { Tweet } from './Tweet';

export const TwitterInfo = ({ state }) => {
  const user = state.data.user[0];
  const tweets = state.data.tweets;

  return (
    <Fragment
      style={{
        fontFamily: '"Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
        fontSize: '15px',
      }}>
      <Box
        style={{
          padding: '20px',
        }}>
        <Text
          style={{
            fontSize: '19px',
            fontWeight: 'bold',
          }}>
          {user.name}
        </Text>
        <Text
          style={{
            marginBottom: '10px',
          }}>
          <a
            href={'https://www.twitter.com/' + user.screen_name}
            target='_blank'>
            {user.screen_name}
          </a>
        </Text>
        <Text
          style={{
            marginBottom: '10px',
          }}>
          {user.description}
        </Text>
        <Text
          style={{
            marginBottom: '10px',
          }}>
          {user.location}{' '}
          {user.entities.url ? (
            <a href={user.entities.url.urls[0].expanded_url}>
              {user.entities.url.urls[0].expanded_url}
            </a>
          ) : (
              ''
            )}
        </Text>
        <Text>
          <strong>{user.followers_count}</strong> Followers
        </Text>
      </Box>
      {tweets && <Box>
        <Heading>Tweets</Heading>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </Box>}
    </Fragment>
  );
};
