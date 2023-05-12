import './App.css';
import Navbar from './Navbar';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <Dashboard />
      </div>
      
    </div>
  );
}

export default App;
