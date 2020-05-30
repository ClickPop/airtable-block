import React, { Fragment } from 'react';
import { Box, Heading, Text } from '@airtable/blocks/ui';

export const YouTubeInfo = ({ state }) => {
  const channels = state.data.youtube.items.map((item) => {
    const { snippet, statistics, brandingSettings, id } = item;
    return {
      id,
      name: snippet.title,
      description: snippet.description,
      views: statistics.viewCount,
      commentCount: statistics.commentCount,
      subscribers: statistics.subscriberCount,
      videoCount: statistics.videoCount,
      trailer: brandingSettings.channel.unsubscribedTrailer,
    };
  });
  return (
    <Fragment>
      {channels.map((channel) => {
        return (
          <Box key={channel.id}>
            <Heading>Channel Name</Heading>
            <Text>{channel.name}</Text>
            <Heading>Channel Description</Heading>
            <Text>{channel.description}</Text>
            <Heading>Views</Heading>
            <Text>{channel.views}</Text>
            <Heading>Subs</Heading>
            <Text>{channel.subscribers}</Text>
            <Heading>Video Count</Heading>
            <Text>{channel.videoCount}</Text>
            <Heading>Comment Count</Heading>
            <Text>{channel.commentCount}</Text>
            {channel.trailer && (
              <Fragment>
                <Heading>
                  <a href={channel.trailer} target='_blank'>
                    Channel Trailer
                  </a>
                </Heading>
              </Fragment>
            )}
            <Heading>
              <a
                href={`https://www.youtube.com/channel/${channel.id}`}
                target='_blank'>
                Channel
              </a>
            </Heading>
          </Box>
        );
      })}
    </Fragment>
  );
};
