import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
import TopNav from './Route/TopNav';
import { Routes, Route} from 'react-router-dom';
import LoginPage from './Component/LoginPage';
import Register from './Component/Register';
import Main from './Component/Main';
import Data from './Component/Data';
import Payment from './Component/payment';
import ProtectedRoute from './Component/ProtectedRoute';
import { getSession } from './Component/session';
import Dashboard from './Component/dashboard';


function App() {
  const userType = getSession("userType");
  const isLoggedIn = getSession("isLoggedIn");
  return (
    <div className="App">
          <TopNav />
            <div>
              <Routes>
                    {/* unauthorized route */}
                    {!isLoggedIn.isLoggedIn && (
                      <>
                        <Route exact path="/" element={<Main />} />
                        <Route path="/Login" element={<LoginPage />} />
                        <Route exact path="/Register" element={<Register />} />
                        <Route exact path="/dashboard" element={<Dashboard />} />
                      </>
                    )}

                     {/* ProtectedRoutes */}
                      <Route path="/" element={<Main />} />
                      <Route path="/Login" element={<LoginPage />} />
                      <Route exact path="/Register" element={<Register />} />
                    {userType.userType === "Admin" ? (
                      <>
                        <Route exact path="/dashboard" element={<Dashboard />} />
                        <Route exact path="/" element={<Main />} />
                        {/* <Route exact path="/Data" element={<Data />} /> 
                        <Route exact path="/Payment/:bill_id" element={<Payment />} />
                        <Route exact path="/Data/:bill_id" element={<Data />} /> */}
                      </>
                    ) : (
                      <>
                      <Route exact path="/" element={<Dashboard />} />
                        <Route exact path="/" element={<Main />} />
                        <Route exact path="/Data" element={<Data />} /> 
                        <Route exact path="/Payment/:uid" element={<Payment />} />
                        <Route exact path="/Data/:bill_id" element={<Data />} />
                      </>
                    )}

              </Routes>
            </div>
            <footer>
              <div> 
                    <p> CopyRight @ 2024-25 || EDF Energy</p>
              </div>
            </footer>
    </div>
  );}

export default App;
          
