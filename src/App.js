import './App.scss';
import './index.scss'
import InputFormPlainComponent from "./components/InputFormPlainComponent";
import InputFormTagComponent from "./components/InputFormTagComponent";

function App() {
  return (
    <div className="container" >
        <InputFormPlainComponent></InputFormPlainComponent>
        <InputFormTagComponent></InputFormTagComponent>
    </div>
  );
}

export default App;
