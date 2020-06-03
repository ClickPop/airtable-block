import React, { Fragment } from 'react';
import { TwitterInfo } from './Twitter/TwitterInfo';
import { YouTubeInfo } from './YouTube/YouTubeInfo';

export const DisplayInfo = ({ field, state }) => {
  return (
    <Fragment>
      {field.name === state.fieldName &&
        {
          twitter: <TwitterInfo state={state} />,
          youtube: <YouTubeInfo state={state} />,
        }[field.name.toLowerCase()]}
    </Fragment>
  );
};
