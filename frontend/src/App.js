import { BrowserRouter as Router} from 'react-router-dom';
import CustomRoutes from './CustomRoutes';
import CustomRoutesTeacher from './CustomRoutesTeacher';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dispatchUser } from './actions/auth';






function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem('User')){
      dispatch(dispatchUser());
    }
  }, [])

  return (
    <div className="App">
      <Router>
        <CustomRoutesTeacher/>
        <CustomRoutes/>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
