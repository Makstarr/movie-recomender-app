import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";

import React from "react";
import { Title } from "../components/Title";
import { MyStepper } from "../components/MyStepper";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const StyledForm = styled.form`
  padding: 10px 40px;
  max-width: 500px;
  margin: auto;
`;

const StyledButton = styled(Button)`
  margin: 30px auto;
  background: linear-gradient(45deg, #ff5d80 30%, #ff7d37 90%);
  font-weight: bold;
  color: #fff;
  border-radius: 8px;
  max-width: 500px;
`;

export const Home = ({ onSetName, username }) => {
  const history = useHistory();

  const [name, setName] = useState();
  const [nameError, setNameError] = useState(false);

  const onInputName = (e) => {
    setNameError(false);
    setName(e.target.value);
  };

  const onSubmitForm = () => {
    if (!name) {
      setNameError(true);
      return;
    } else {
      onSetName(name);
      history.push("/movies");
    }
  };

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    console.log(!!savedName);
    if (!!savedName && savedName!="null") {
      onSetName(savedName);
      history.push("/movies");
    }
  }, []);

  return (
    <>
      <MyStepper step={0} />
      <Title title="Регистрация" />
      <StyledForm noValidate autoComplete="off">
        <TextField
          error={nameError}
          id="outlined-basic"
          label="Имя"
          variant="outlined"
          helperText="Оставьте имя, чтобы другие могли найти ваши оценки"
          fullWidth
          onInput={onInputName}
        />
        <StyledButton
          variant="contained"
          disableElevation
          fullWidth
          onClick={onSubmitForm}
        >
          Дальше
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default Home;
