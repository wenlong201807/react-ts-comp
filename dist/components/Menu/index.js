import Menu from './menu';
import SubMenu from './subMenu';
import MenuItem from './menuItem';
var TransMenu = Menu; // 断言
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
