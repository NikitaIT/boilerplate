import React from 'react';
import { Button } from '@storybook/react/demo';
import { action } from '@storybook/addon-actions';
import { classNames, F } from '@mylib/framework';

export const ButtonGroup = () => (
  <div className="ButtonGroup">
    <Button onClick={action('reset state')}>reset state</Button>
    <Button onClick={action('prev state')}>prev state</Button>
    <Button onClick={action('next state')}>next state</Button>
    <Button onClick={action('save state')}>save state</Button>
  </div>
);

// eslint-disable-next-line no-empty
if ('d' in classNames) {
  F();
}
