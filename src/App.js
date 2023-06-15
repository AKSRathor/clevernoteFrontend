// import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import NoteState from './Context/NoteState';
import NotePad from './Components/NotePad';
import Notebook from './Components/Notebook';
import TagsList from './Components/TagsList';

function App() {
  return (<>

    <NoteState>

      <div className="App">
        <BrowserRouter>
          <TagsList />
          <Routes>
            <Route exact path="/login" element={<Login />} />
          </Routes>
          <div className="sideAll" >
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<Home />} />


              <Route exact path="/note" element={<NotePad />} />
              <Route exact path="/notebook" element={<Notebook />} />
            </Routes>

          </div>
        </BrowserRouter>
      </div>
    </NoteState>
  </>

  )
}

export default App
