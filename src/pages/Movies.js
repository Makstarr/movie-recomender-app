import React from "react";
import styled from "styled-components";
import { Title } from "../components/Title";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useState } from "react";
import { MyStepper } from "../components/MyStepper";
import { useEffect } from "react";
import axios from "axios";

const StyledRating = withStyles({
  iconFilled: {
    color: "#cc333b",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const StyledButton = styled(Button)`
  margin: 30px auto;
  background: linear-gradient(45deg, #ff5d80 30%, #ff7d37 90%);
  font-weight: bold;
  color: #fff;
  border-radius: 8px;
  max-width: 500px;
`;

const Content = styled.div`
  position: relative;
  padding: 20px;
  width: 100%;
`;
const MyTypography = styled.h3`
  font-size: 16px;
  font-weight: 500;
`;
const Refresh = styled(Button)`
  position: absolute;
  top: -60px;
  right: 20px;
`;
const StyledCardMedia = styled(CardMedia)`
  padding-top: 100%;
`;
const FilmCard = styled(Card)`
  min-height: 350px;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const MyContainer = styled.div`
  display: grid;
  justify-content: center;
`;

export const Movies = ({ apiUrl, onSetRatings, onSetName }) => {
  const history = useHistory();

  const [ratings, setRatings] = useState({});
  const [movies, setMovies] = useState([]);

  // one rating
  const onRating = (id, rating) => {
    const newRating = { ...ratings };
    newRating[id] = rating;
    setRatings(newRating);
  };

  // all ratings
  const onSubmitForm = () => {
    if (Object.keys(ratings).length === 0) {
      alert("Оцените хотя бы один фильм");
      return;
    } else {
      onSetRatings(ratings);
      history.push("/friends");
    }
  };
  const getFilms = async () => {
    let { data } = await axios.get(apiUrl + "/get-films?n=12");
    console.log(data);
    setMovies(data.films);
  };
  useEffect(() => {
    const savedName = localStorage.getItem("username");
    const savedRatings = localStorage.getItem("ratings");
    console.log(!!savedRatings);
    if (!savedName || savedName === "null") {
      history.push("/");
    } else if (
      !!savedRatings && savedRatings != "null" &&
      Object.keys(JSON.parse(savedRatings)).length > 0
    ) {
      history.push("/friends");
    } else {
      onSetRatings(JSON.parse(savedRatings));
      onSetName(savedName);
      console.log(apiUrl);
      try {
        getFilms();
      } catch (e) {
        alert(e);
      }
    }
  }, []);

  const refreshFilms = async () => {
    setMovies([]);
    try {
      let { data } = await axios.get(apiUrl + "/get-films?n=10");
      console.log(data);
      setMovies(data.films);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <MyStepper step={1} />
      <Title title="Оцените фильмы" />
      <Content>
        <Tooltip title="Загрузить еще фильмов" arrow>
          <Refresh>
            <RefreshIcon onClick={refreshFilms}></RefreshIcon>
          </Refresh>
        </Tooltip>
        <Grid container spacing={5}>
          {movies.length ? (
            movies.map((item) => (
              <Grid item xs={3} key={item.film_id}>
                <FilmCard>
                  <StyledCardMedia image={item.poster_url} title="" />
                  <CardContent>
                    <MyTypography>{item.film_title}</MyTypography>
                    <StyledRating
                      key={item.film_id}
                      name={"film" + item.film_id}
                      defaultValue={0}
                      precision={0.5}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      onChange={(event, newValue) => {
                        onRating(item.film_id, newValue);
                      }}
                    />
                  </CardContent>
                </FilmCard>
              </Grid>
            ))
          ) : (
            <MyContainer>
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            </MyContainer>
          )}
        </Grid>
      </Content>
      <StyledButton
        variant="contained"
        disableElevation
        fullWidth
        onClick={onSubmitForm}
      >
        Дальше
      </StyledButton>
    </>
  );
};

export default Movies;
