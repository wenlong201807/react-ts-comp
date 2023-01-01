import React, { useState } from 'react';
import Button from './components/Button/button';
import Menu, { MenuProps } from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon';
import Transition from './components/Transition';
// import AutoComplete from './components/AutoComplete';

const defalutProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: [],
};
const defalutProps2: MenuProps = {
  defaultIndex: '0',
  mode: 'horizontal',
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
        <MenuItem>drop3</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

function App() {
  const [show, setShow] = useState(false);
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
      {generateMenu(defalutProps2)}

      <br />
      <br />
      <br />
      <Icon icon="coffee" theme="danger" size="10x" />
      <br />
      <br />
      <br />
      <Transition in={show} timeout={300} animation="zoom-in-top" wrapper>
        <div>
          <p>asdasdf</p>
          <p>asdasdf</p>
          <p>asdasdf</p>
          <p>asdasdf</p>
        </div>
      </Transition>
      <Button onClick={() => setShow(!show)}>动画展示</Button>
      <br />
      <br />
      <br />
      {/* <AutoComplete ></AutoComplete> */}
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
