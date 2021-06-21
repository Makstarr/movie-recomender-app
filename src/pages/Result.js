import React from "react";
import { Title } from "../components/Title";

import styled from "styled-components";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { Alert } from "@material-ui/lab";
import { useState } from "react";

const Content = styled.div`
  position: relative;
  padding: 20px;
`;

const StyledCardMedia = styled(CardMedia)`
  padding-top: 110%;
`;
const FilmCard = styled(Card)`
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;
const MyContainer = styled.div`
  display: grid;
  justify-content: center;
`;

export const Result = ({ onSetRatings, onSetName, onSetFriends, result }) => {
  const history = useHistory();

  const [cachedResult, setCachedResult] = useState([]);

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    const savedRatings = localStorage.getItem("ratings");
    const savedFriends = localStorage.getItem("friends");
    const savedResult = localStorage.getItem("result");
    if (!savedName || savedName === "null") {
      history.push("/");
    }
    if (
      !savedRatings ||
      savedRatings === "null" ||
      (!!savedRatings && !savedRatings.length)
    ) {
      history.push("/movies");
    }
    if (
      !savedRatings ||
      savedRatings === "null" ||
      (!!savedRatings && !savedRatings.length)
    ) {
      history.push("/friends");
    }
    if (!!savedResult && savedRatings != "null" && !!savedResult.length) {
      setCachedResult(JSON.parse(savedResult));
    } else {
      onSetRatings(JSON.parse(savedRatings));
      onSetName(savedName);
      onSetFriends(JSON.parse(savedFriends));
    }
  }, []);
  return (
    <>
      <Title title="Результат" />
      <Content>
        <Grid container spacing={5}>
          {result && result.length ? (
            result.map((item) => (
              <Grid item xs={3} key={item.film_id}>
                <FilmCard>
                  <StyledCardMedia image={item.poster_url} title="" />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h5">
                      {item.film_title}
                    </Typography>
                  </CardContent>
                </FilmCard>
              </Grid>
            ))
          ) : cachedResult && cachedResult.length ? (
            cachedResult.map((item) => (
              <Grid item xs={3} key={item.film_id}>
                <FilmCard>
                  <StyledCardMedia image={item.poster_url} title="" />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h5">
                      {item.film_title}
                    </Typography>
                  </CardContent>
                </FilmCard>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <MyContainer>
                <CircularProgress />
              </MyContainer>
            </Grid>
          )}
        </Grid>
      </Content>
    </>
  );
};

export default Result;
