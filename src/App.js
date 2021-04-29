import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./component/Header";
import styled from "styled-components";
import SideBar from "./component/SideBar";
import Chat from "./component/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./component/Login";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt="Slack Icon"
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <React.Fragment>
            <Header />
            <AppBody>
              <SideBar />
              <Switch>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </React.Fragment>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
    padding: 20px;
  }
`;
