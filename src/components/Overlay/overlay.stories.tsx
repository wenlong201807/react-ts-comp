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
      <div style={{ height: '130px' }}>
        <div>功能1、自定义弹框展示的位置</div>
        <div>功能2、自定义关闭行为，如 指定ESC按键可关闭</div>
        <div>功能3、自定义 弹框不可关闭的安全域，且在此域内可配置关闭</div>
        <div>
          功能4、关闭弹框，和其他事件的触发可以 一次执行，【减少一次】的点击行为{' '}
        </div>
      </div>
      <Button
        onClick={() => {
          setOther(!other);
          console.log(buttonRef);
        }}
      >
        功能4
      </Button>
      <br />
      <div style={{ height: '40px' }}>{other ? '显示aa' : '隐藏bb'}</div>
      <br />
      <br />
      <Button
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log(88);
        }}
        onClick={(e: any) => {
          setVisible(true);
        }}
        ref={buttonRef}
      >
        打开弹框-功能1
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
            background: '#ccc',
          }}
        >
          自定义弹框内容区域(UI完全可控)
          <Button btnType="primary" onClick={() => setInner(!inner)}>
            功能4
          </Button>
          <br />
          <div style={{ height: '40px' }}>
            {inner ? '安全域内--显示cc' : '安全域内--隐藏dd'}
          </div>
          <Button btnType="danger" onClick={() => setVisible(false)}>
            功能3
          </Button>
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
