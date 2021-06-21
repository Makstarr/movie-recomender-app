import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Movies } from "./pages/Movies";
import { Friends } from "./pages/Friends";
import { Result } from "./pages/Result";
import { useState } from "react";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { Container, Paper } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";

const apiUrl = "http://10.54.49.235:5000";

const StyledPaper = styled(Paper)`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;
const AppWrapper = styled.div`
  padding: 40px 0;
`;

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#ff8800",
      },
    },
  });
  const [username, setUsername] = useState("");
  const [ratings, setRatings] = useState({});
  const [friends, setFriends] = useState([]);
  const [result, setResult] = useState([]);

  function onSetName(name) {
    setUsername(name);
    localStorage.setItem("username", name);
  }

  function onSetRatings(ratings) {
    setRatings(ratings);
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }

  async function onSetFriends(newFriends) {
    setFriends(newFriends);
    localStorage.setItem("friends", JSON.stringify(newFriends));

    try {
      let { data } = await axios.post(apiUrl + "/davaaaaay", {
        username,
        ratings,
        friends: newFriends,
      });
      console.log(data.films);
      setResult(data.films);
      localStorage.setItem("result", JSON.stringify(data.films));

      return data;
    } catch (e) {
      alert(e);
      setResult(false);
      return 0;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppWrapper>
        <Router>
          <Container maxWidth="md">
            <StyledPaper elevation={3}>
              <Switch>
                <Route path="/" exact>
                  <Home onSetName={onSetName} username={"1"} />
                </Route>
                <Route path="/friends" exact>
                  <Friends
                    onSetRatings={onSetRatings}
                    onSetName={onSetName}
                    onSetFriends={onSetFriends}
                    apiUrl={apiUrl}
                  />
                </Route>
                <Route path="/movies" exact>
                  <Movies
                    onSetRatings={onSetRatings}
                    onSetName={onSetName}
                    apiUrl={apiUrl}
                  />
                </Route>
                <Route path="/result" exact>
                  <Result
                    result={result}
                    onSetRatings={onSetRatings}
                    onSetName={onSetName}
                    onSetFriends={onSetFriends}
                    apiUrl={apiUrl}
                  />
                </Route>
              </Switch>
            </StyledPaper>
          </Container>
        </Router>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
