import React from 'react';
import { Button } from '@storybook/react/demo';
import { action } from '@storybook/addon-actions';

export const ButtonGroup = () => (
  <div className="ButtonGroup">
    <Button onClick={action('reset state')}>reset state</Button>
    <Button onClick={action('prev state')}>prev state</Button>
    <Button onClick={action('next state')}>next state</Button>
    <Button onClick={action('save state')}>save state</Button>
  </div>
);
