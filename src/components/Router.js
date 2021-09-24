
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({isLoggedIn}) => {
    // 함수의 내부 - 연산, 호출 ...
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                ) : (
                    <Route exact path="/">
                        <Auth></Auth>
                    </Route>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;