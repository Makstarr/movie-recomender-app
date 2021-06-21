import React from "react";
import styled, { css } from "styled-components";
import { Title } from "../components/Title";
import { useHistory } from "react-router-dom";
import { Button, Card, CircularProgress, Grid } from "@material-ui/core";
import { useState } from "react";
import { MyStepper } from "../components/MyStepper";
import { useEffect } from "react";
import axios from "axios";
import { CollectionsTwoTone } from "@material-ui/icons";

const StyledButton = styled(Button)`
  margin: 30px auto;
  background: linear-gradient(45deg, #ff5d80 30%, #ff7d37 90%);
  font-weight: bold;
  color: #fff;
  border-radius: 8px;
  max-width: 500px;
`;
const FriendButton = styled(Button)`
  font-weight: bold;
  color: #fff;
  ${(props) =>
    props.green === "green" &&
    css`
      background: #1fc409 !important;
      color: #000;
    `}
`;

const Content = styled.div`
  position: relative;
  padding: 20px;
`;
const MyContainer = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
`;
const SubTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 300;
  margin-top: 0;
`;

const FriendCard = styled(Card)`
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const Friends = ({ onSetRatings, onSetName, onSetFriends, apiUrl }) => {
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  // one rating
  const onFriend = (friend) => {
    if (friends.indexOf(friend) >= 0) {
      let newFriends = friends;
      console.log(newFriends);
      if (newFriends.length === 1) {
        newFriends = [];
      } else {
        newFriends.splice(friends.indexOf(friend), 1);
      }
      console.log(newFriends);

      setFriends(newFriends);
      console.log(friends);
    } else {
      setFriends([...friends, friend]);
    }
  };

  // all ratings
  const onSubmitForm = async () => {
    setLoading(true);
    let result = await onSetFriends(friends);
    console.log(result);
    setLoading(false);
    if (result) {
      history.push("/result");
    }
  };
  const getUsers = async () => {
    const { data } = await axios.get(apiUrl + "/get_users");
    setUsers(data.friends);
  };
  useEffect(() => {
    const savedName = localStorage.getItem("username");
    const savedRatings = localStorage.getItem("ratings");
    const savedFriends = localStorage.getItem("friends");

    if (!savedName || savedName === "null") {
      history.push("/");
    }
    if (
      !savedRatings ||
      savedRatings === "null" ||
      (!!savedRatings && !savedRatings.length)
    ) {
      history.push("/movies");
    } else {
      //if (!savedFriends || savedFriends === "null" || !savedFriends.length) {
      onSetRatings(JSON.parse(savedRatings));
      onSetName(savedName);
      getUsers();
      // onSetFriends(JSON.parse(savedFriends));
      //history.push("/result");
    }
  }, []);

  return (
    <>
      <MyStepper step={2} />
      <Title title="Выберите ваших друзей" />
      <SubTitle>
        Мы попробуем подобрать фильмы подходящие для совместного просмотра!
      </SubTitle>
      {loading ? (
        <MyContainer>
          <CircularProgress />
        </MyContainer>
      ) : (
        <Content>
          <Grid container spacing={5}>
            {users && users.length ? (
              users.map((item) => (
                <Grid item xs={3} key={item.user_id}>
                  <FriendCard>
                    <FriendButton
                      name={item.user_id}
                      fullWidth
                      green={friends.indexOf(item.user_id) >= 0 ? "green" : ""}
                      onClick={() => {
                        onFriend(item.user_id);
                      }}
                    >
                      {item.username}
                    </FriendButton>
                  </FriendCard>
                </Grid>
              ))
            ) : (
              <MyContainer>
                <Content></Content>
                <Grid item xs={12}>
                  <CircularProgress />
                </Grid>
              </MyContainer>
            )}
          </Grid>
        </Content>
      )}
      {users && users.length ? (
        <StyledButton
          disabled={loading}
          variant="contained"
          disableElevation
          fullWidth
          onClick={onSubmitForm}
        >
          Получить рекомендацию
        </StyledButton>
      ) : (
        <Content></Content>
      )}
    </>
  );
};

export default Friends;
