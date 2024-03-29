import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
// import { action } from '@storybook/addon-actions'
import Transition from './transition';
import Button from '../Button';

const SimpleTransition = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div style={{ height: '50px' }}>
        <div>解决痛点: 动画的后半截失效</div>
      </div>
      <div style={{ height: '130px' }}>
        <Button onClick={() => setShow(!show)}>动画展示</Button>
        <Transition in={show} timeout={300} animation="zoom-in-top" wrapper>
          <div>
            <p>asdasdf</p>
            <p>asdasdf</p>
            <p>asdasdf</p>
            <p>asdasdf</p>
          </div>
        </Transition>
      </div>
    </>
  );
};

storiesOf('Transition component', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      text: `
    this is a very nice component
    ## this is Transition
    ~~~js
    npm install react-ts-comp --save
    ~~~
    `,
      inline: true,
    },
  })
  .add('Transition', SimpleTransition);
