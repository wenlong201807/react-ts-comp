
import Button from "./components/Button/button.tsx";

function App() {
  return (
    <div className="App">
      <Button className="aa" >默认按钮</Button>
      <Button disabled> disabled button</Button>
      <Button btnType="primary" size="lg">Large Button</Button>
      <Button btnType="primary" size="sm">Large Button</Button>
      <Button btnType="link" size="sm" href="http://www.baidu.com">百度 Button</Button>
    </div>
  );
}

export default App;
