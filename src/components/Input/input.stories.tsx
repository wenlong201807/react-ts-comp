import React, { useState, ChangeEvent } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { Input } from './input';
const ControlledInput = () => {
  const [value, setValue] = useState(''); // 测试手控组件效果
  return (
    <Input
      value={value}
      defaultValue={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      }}
    />
  );
};
const defaultInput = () => (
  <>
    <div style={{ height: '50px' }}>
      <div>VS (Element iview)</div>
      <div>解决痛点: 初始值为undefine的时候, 重置为 空字符串</div>
    </div>
    <Input
      style={{ width: '300px' }}
      placeholder="placeholder"
      onChange={action('changed')}
    />
    <ControlledInput />
  </>
);
const disabledInput = () => (
  <Input style={{ width: '300px' }} placeholder="disabled input" disabled />
);

const iconInput = () => (
  <Input
    style={{ width: '300px' }}
    placeholder="input with icon"
    icon="search"
  />
);

const sizeInput = () => (
  <>
    <Input style={{ width: '300px' }} defaultValue="large size" size="lg" />
    <Input style={{ width: '300px' }} placeholder="small size" size="sm" />
  </>
);

const pandInput = () => (
  <>
    <Input
      style={{ width: '300px' }}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input style={{ width: '300px' }} defaultValue="google" append=".com" />
  </>
);

storiesOf('Input component', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      text: `
    this is a simple component
    ## this is Input
    ~~~js
    npm install react-ts-comp --save
    ~~~
    `,
      inline: true,
    },
  })
  .add('Input', defaultInput)
  .add('被禁用的 Input', disabledInput)
  .add('带图标的 Input', iconInput)
  .add('大小不同的 Input', sizeInput)
  .add('带前后缀的 Input', pandInput);
