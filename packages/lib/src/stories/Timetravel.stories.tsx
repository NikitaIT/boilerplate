import React from 'react';
import { ButtonGroup } from './ButtonGroup';
import {
  subscribeToServerState,
  createRandomServerState,
} from './api/RemouteUpdatePusher';

// удалить после ознакомления ->
(window as any).subscribeToServerState = subscribeToServerState;
(window as any).createRandomServerState = createRandomServerState;
// <-

export const TimeTrevelStory = () => (
  <>
    <ButtonGroup />
  </>
);
