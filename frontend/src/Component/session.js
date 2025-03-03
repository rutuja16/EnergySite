export const setSession = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSession = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};



export const clearSession = (key) => {
  sessionStorage.removeItem(key);
};

//const createSession=((Token,userType,Name , UID)=>{
                // localStorage.setItem("token", Token);
                // localStorage.setItem("userType", userType);
                // localStorage.setItem("loggedIn", true);
                // localStorage.setItem("User" , Name);
                // localStorage.setItem("UID" , UID);

                    // const isLoggedIn = window.localStorage.getItem("loggedIn"); // Check if logged in
                    // const userType = window.localStorage.getItem("userType");
                    // const userName =window.localStorage.getItem('User');
                    // const UID = localStorage.getItem("UID");
    //})
