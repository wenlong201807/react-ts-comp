import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Icon from './icon';

const defaultIcon = () => (
  <Icon icon='check-circle' theme='primary' />
);

storiesOf('Icon 组件', module)
  // .addDecorator(CenterDecorator) // 居中展示
  .addDecorator(withInfo)
  .addParameters({
    info: {
      text: `
      this is a very nice component
      ## this is Icon
      ~~~js
      npm install react-ts-comp --save
      ~~~
      `,
      inline: true,
    },
  })
  .add('Icon', defaultIcon)
  