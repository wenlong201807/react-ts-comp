import React  from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info';
// import { action } from '@storybook/addon-actions'
import Progress from './index'

const SimpleProgress = () => {
  return (
    <Progress percent={90} />
  )
}

storiesOf('SimpleProgress component', module)
.addDecorator(withInfo)
.addParameters({
  info: {
    text: `
    this is a very nice component
    ## this is SimpleProgress
    ~~~js
    npm install react-ts-comp --save
    ~~~
    `,
    inline: true,
  },
})
  .add('SimpleProgress', SimpleProgress)