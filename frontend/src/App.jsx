import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import UserRoute from './Routes/UserRoute'
import AdminRoute from './Routes/AdminRoute'


function App() {


  return (
    <Router>
      <Routes>
      <Route path='/*' element={<UserRoute/>} />
      <Route path='/admin/*' element={<AdminRoute/> } />
      </Routes>
    </Router>
  )
}

export default App
