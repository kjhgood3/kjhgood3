import {useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  // 현재 접속자 확인
  console.log(authService.currentUser);
  // 상수 선언, ES6문번의 구조 분해 할당
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}></AppRouter>
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
