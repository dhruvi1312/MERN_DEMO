import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoginForm from './components/LoginForm'
import StudentListDashboard from './components/StudentListDashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/student-list" element={<StudentListDashboard />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
