import './App.css';
import Login from './login';
import Dashboard from './dashboard';

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <div className="app">
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}

export default App;
