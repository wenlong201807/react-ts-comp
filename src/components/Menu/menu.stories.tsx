import React  from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info';
import Menu from './index'
import { MenuProps } from '../Menu/menu';
const defalutProps2: MenuProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <Menu.Item>active</Menu.Item>
      <Menu.Item disabled>disabled</Menu.Item>
      <Menu.Item>xyz</Menu.Item>
      <Menu.SubMenu title="dropdown">
        <Menu.Item>drop1</Menu.Item>
        <Menu.Item>drop3</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="opened">
        <Menu.Item>opened1</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
const defaultMenu = () => {
  return generateMenu(defalutProps2)
}

storiesOf('Menu component', module)
.addDecorator(withInfo)
.addParameters({
  info: {
    text: `
    this is a very nice component
    ## this is Menu
    ~~~js
    npm install react-ts-comp --save
    ~~~
    `,
    inline: true,
  },
})
  .add('Menu', defaultMenu)