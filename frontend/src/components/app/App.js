import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import api from "../../api";
import { useDispatch } from "react-redux";
import { signIn } from "../../actions/authentication";
import HomePage from "../../pages/Home";
import SignInPage from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignUpPage";
function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      api
        .get(`/user/getUser/${userId}`)
        .then((res) => {
          dispatch(signIn(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
