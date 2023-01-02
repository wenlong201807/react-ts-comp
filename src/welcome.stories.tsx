import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 wenlong.zhu 组件库</h1>
        <p>wenlong.zhu 实现组件 Button, Menu, AutoComplete, Upload, Input, Progress</p>
        <h3>安装试试</h3>
        <code>
          npm install react-ts-comp --save
        </code>
      </>
    )
  }, { info : { disable: true }})