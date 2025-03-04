import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
import TopNav from './Route/TopNav';
import { Routes, Route} from 'react-router-dom';
import LoginPage from './Component/LoginPage';
import Register from './Component/Register';
import Main from './Component/Main';
import Data from './Component/Data';
import Payment from './Component/payment';
//import ProtectedRoute from './Component/ProtectedRoute';
import { getSession } from './Component/session';
import Dashboard from './Component/dashboard';


function App() {
  const userType = getSession("userType")|| "Guest";
  const isLoggedIn = getSession("isLoggedIn")|| false;
  return (
    <div className="App">
          <TopNav />
            <div>
              <Routes>
                    {/* unauthorized route */}
                    {!isLoggedIn.isLoggedIn && (
                      <>
                      <h1>{isLoggedIn.isLoggedIn}</h1>
                        {/* <Route exact path="/" element={<Main />} /> */}
                        <Route path="/Login" element={<LoginPage />} />
                        <Route exact path="/Register" element={<Register />} />
                        
                      </>
                    )}

                     {/* ProtectedRoutes */}
                      <Route path="/" element={<Main />} />
                      <Route path="/Login" element={<LoginPage />} />
                      <Route exact path="/Register" element={<Register />} />
                      <Route exact path="/data" element={<Data />} />
                      <Route exact path="/dashboard" element={<Dashboard />} />
                      <Route exact path="/Payment/:bill_id" element={<Payment />} />
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
                      {/* <Route exact path="/" element={<Dashboard />} /> */}
                        <Route exact path="/" element={<Main />} />
                        <Route exact path="/Data" element={<Data />} /> 
                        <Route exact path="/Payment/:bill_id" element={<Payment />} />
                        <Route exact path="/Data/:bill_id" element={<Data />} />
                      </>
                    )}

              </Routes>
            </div>
            
    </div>
  );}

export default App;
          
