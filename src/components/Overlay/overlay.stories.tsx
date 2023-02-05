import React, { useState, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import { Overlay } from './Overlay';
import Button from '../Button/button';

const Template: ComponentStory<typeof Overlay> = (args) => (
  <Overlay {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <div
      style={{
        border: '1px solid black',
        width: 300,
        height: 300,
      }}
    >
      Content
    </div>
  ),
};

const UnderControl = () => {
  const [inner, setInner] = useState(false);
  const [other, setOther] = useState(false);
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef();
  return (
    <>
      <Button onClick={() => {
        setOther(!other)
        console.log(buttonRef)
      }}>其他操作, 一往如常</Button>
      <br />
      <div style={{ height: '40px' }}>{other ? '显示aa' : '隐藏bb'}</div>
      <br />
      <br />
      <Button onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(88)
      }} onClick={(e: any) => {
        setVisible(true)
      }} ref={buttonRef}>
        打开弹框
      </Button>
      <Overlay
        visible={visible}
        onVisibleChange={(v: boolean | ((prevState: boolean) => boolean)) =>
          setVisible(v)
        }
        // dom={document.querySelector('#openid')}
        dom={buttonRef.current} // 未生效
        // target={() => buttonRef.current}
      >
        <div
          style={{
            border: '1px solid black',
            width: 300,
            height: 300,
            background: '#ccc'
          }}
        >
          Under Control Overlay
          <Button btnType='primary' onClick={() => setInner(!inner)}>
            安全域内的，其他操作, 一往如常
          </Button>
          <br />
          <div style={{ height: '40px' }}>
            {inner ? '安全域内--显示aa' : '安全域内--隐藏bb'}
          </div>
          <div>可按 ESC 键位 关闭</div>
        </div>
      </Overlay>
    </>
  );
};

storiesOf('Model 组件', module)
  // .addDecorator(CenterDecorator) // 居中展示
  .addDecorator(withInfo)
  .addParameters({
    info: {
      text: `
      this is a very nice component
      ## this is Model
      ~~~js
      npm install react-ts-comp --save
      ~~~
      `,
      inline: true,
    },
  })
  .add('自定义弹框', UnderControl);
