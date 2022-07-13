import React, { useState } from 'react';
import {
  Page,
  List,
  ListInput,
  Button,
} from 'framework7-react';
import logo from '../static/logo.png';
import logIn from '../js/auth';

function HomePage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const tryLogIn = () => {
    if (usernameValid && passwordValid) {
      logIn(username, password);
    }
  };

  return (
    <Page name="home">
      <img src={logo} alt="Logo" className="logo_item" />
      <List inset className="home_item">
        <ListInput
          className="login_input"
          type="email"
          placeholder="Username"
          validate
          required
          onChange={(e) => { setUsername(e.target.value); }}
          onValidate={(isValid) => { setUsernameValid(isValid); }}
          clearButton
        />

        <ListInput
          className="login_input"
          type="password"
          validate
          required
          placeholder="Password"
          onChange={(e) => { setPassword(e.target.value); }}
          onValidate={(isValid) => { setPasswordValid(isValid); }}
          clearButton
        />
        <Button className="button_yellow" fill disabled={!(usernameValid && passwordValid)} onClick={tryLogIn}>Log in</Button>
      </List>
    </Page>
  );
}
export default HomePage;
