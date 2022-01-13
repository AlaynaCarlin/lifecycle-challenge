import './App.css';
import PokeFetch from './Components/PokeFetch/PokeFetch';


function App() {
  return (
    <div className="App">
      {/* <div className='App-header'> */}
      <PokeFetch startCount='10'/>
      {/* </div> */}
    </div>
  );
}

export default App;
