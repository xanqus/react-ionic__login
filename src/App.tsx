import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonHeader,
  IonButton,
} from "@ionic/react";
import { useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { signIn } from "./auth/auth";
import AuthRoute from "./auth/AuthRoute";
import LogoutButton from "./components/LogoutButton";
import LoginForm from "./pages/LoginForm";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const authenticated = user != null;

  const login = ({ email, password }: any) =>
    setUser(signIn({ email, password }));
  const logout = () => setUser(null);

  return (
    <IonApp>
      <BrowserRouter>
        <header>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/about">
            <button>About</button>
          </Link>
          <Link to="/profile">
            <button>Profile</button>
          </Link>
          {authenticated ? (
            <LogoutButton logout={logout} />
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </header>
        <hr />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <AuthRoute
              authenticated={authenticated}
              path="/profile"
              render={(props: any) => {
                return <Profile user={user} {...props} />;
              }}
            />
            <Route
              path="/login"
              render={(props) => (
                <LoginForm
                  authenticated={authenticated}
                  login={login}
                  {...props}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
