import React from 'react';
import Button from './components/Button/button';
import Menu, { MenuProps } from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon';

const defalutProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: [],
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

function App() {
  return (
    <div className="App">
      <Button className="aa">默认按钮</Button>
      <Button disabled> disabled button</Button>
      <Button btnType="primary" size="lg">
        Large Button
      </Button>
      <Button btnType="primary" size="sm">
        Large Button
      </Button>
      <Button btnType="link" size="sm" href="http://www.baidu.com">
        百度 Button
      </Button>
      <br />
      <br />
      <br />
      {generateMenu(defalutProps)}

      <br />
      <br />
      <br />
      <Icon icon="coffee" theme="danger" size="10x" />
    </div>
  );
}

export default App;
