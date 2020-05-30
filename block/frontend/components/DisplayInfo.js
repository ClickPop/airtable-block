import React, { Fragment } from 'react';
import { TwitterInfo } from './Twitter/TwitterInfo';
import { YouTubeInfo } from './YouTube/YouTubeInfo';

export const DisplayInfo = ({ field, state }) => {
  return (
    <Fragment>
      {
        {
          twitter: <TwitterInfo state={state} />,
          youtube: <YouTubeInfo state={state} />,
        }[field.name.toLowerCase()]
      }
    </Fragment>
  );
};
