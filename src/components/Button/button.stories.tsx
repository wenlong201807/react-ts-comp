import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import Button from './button';

const styles: React.CSSProperties = {
  textAlign: 'center',
};

const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>;

const defaultButton = () => (
  <Button onClick={action('clicked')}> default button </Button>
);

const buttonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="default"> default button </Button>
    <Button btnType="link" href="https://google.com">
      link button
    </Button>
  </>
);

storiesOf('Button 组件', module)
  // .addDecorator(CenterDecorator) // 居中展示
  .addDecorator(withInfo)
  .addParameters({
    info: {
      // text: `
      // this is a very nice component
      // ## this is header
      // ~~~js
      // const a = 'wenlong'
      // ~~~
      // `,
      inline: true,
    },
  })
  .add('Button', defaultButton)
  .add(
    '不同尺寸的 Button',
    buttonWithSize
    // ,{
    // info: {
    //   inline: false
    // }
    // }
  )
  .add('不同类型的 Button', buttonWithType);
