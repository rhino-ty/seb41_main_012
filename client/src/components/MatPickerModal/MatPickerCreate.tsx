import React, { useState } from "react";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import { createPickers } from "../../api/axiosAPI/groups/PickersAxios";

const ModalContainer = styled.div`
  height: 100%;
  width: calc(1340px * 2 / 5 - 63px);
  z-index: 1000;
`;

const Backdrop = styled.div`
  top: 0;
  left: 0;
  width: calc(1340px * 2 / 5 - 63px);
  height: 100vh;
  position: fixed;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.2);
`;

const DialogBox = styled.dialog`
  top: 250px;
  left: 79px;
  margin: 0;
  width: 370px;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 7px;
  box-shadow: 1px 0px 86px -17px rgba(127, 127, 127, 0.75);
  box-sizing: border-box;
  background-color: white;
  position: fixed;
  z-index: 10020;

  h3 {
    margin: 40px 0;
    font-size: 25px;
  }

  input {
    height: 40px;
    width: 300px;
    padding: 10px;
    border: 1px solid #adadad;
    outline: none;
    border-radius: 12px;
    color: #373737;
    font-size: 1rem;

    &:hover {
      outline: rgb(241, 133, 137, 0.4) solid 3px;
    }
  }
`;

const TabContainer = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  width: 300px;
  padding: 10px;
  border: 1px solid #adadad;
  border-radius: 12px;
`;
const TabButton = styled.li`
  height: 30px;
  width: 30px;
  list-style: none;
  border-radius: 20px;
  background: url(${(props) => props.color || "gray"});
  background-size: 100%;
  filter: ${(props) => (props.id === "focused" ? "brightness(0.8)" : "none")};
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 40px;
  button {
    cursor: pointer;
    font-size: 20px;
    height: 40px;
    width: 60px;
    margin: 0 10px;
    border: none;
    background-color: #874356;
    color: #ffffff;
    border-radius: 30px;
  }

  button:hover {
    font-weight: 700;
  }
`;

interface ModalDefaultType {
  onClickToggleModal: () => void;
  dataReloadHandler: () => void;
}

const tabs = [
  {
    groupImgIndex: 0,
    groupImg:
      "https://user-images.githubusercontent.com/94962427/214733213-a2c51280-6525-49ed-b60c-5e7e248890f8.svg",
  },
  {
    groupImgIndex: 1,
    groupImg:
      "https://user-images.githubusercontent.com/94962427/214733289-7588880b-0492-429f-9e7e-8dbc883a88a3.svg",
  },
  {
    groupImgIndex: 2,
    groupImg:
      "https://user-images.githubusercontent.com/94962427/214733318-efc109a4-439d-4b3a-b17e-ab478ff16102.svg",
  },
];

const MatPickerCreate = ({
  onClickToggleModal,
  dataReloadHandler,
}: ModalDefaultType) => {
  const [colorValue, setColorValue] = useState(3);
  const [nameValue, setNameValue] = useState("");

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      dataReloadHandler();
      onClickToggleModal();
    }
  };
  const { axiosData } = useAxios(
    () => createPickers(nameValue, colorValue),
    [nameValue, colorValue],
    true
  );

  const hadleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleMatPickPost = (e: React.MouseEvent) => {
    if (nameValue && colorValue !== 9) {
      axiosData();
      closeModal(e);
    }
  };

  const hadleCancle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  };

  return (
    <ModalContainer>
      <DialogBox>
        <label htmlFor="input-title">
          <h3>맛픽커즈 이름</h3>
        </label>
        <input
          id="input-title"
          placeholder="이름을 입력하세요"
          value={nameValue || ""}
          onChange={(e) => hadleName(e)}
        />
        <h3>맛픽커즈 색상</h3>
        <TabContainer>
          {tabs.map((el) => (
            <TabButton
              key={el.groupImgIndex}
              id={el.groupImgIndex === colorValue ? "focused" : ""}
              color={el.groupImg}
              onClick={() => {
                setColorValue(el.groupImgIndex);
              }}
            />
          ))}
        </TabContainer>
        <ButtonContainer>
          <button onClick={handleMatPickPost}>확인</button>
          <button onClick={hadleCancle}>취소</button>
        </ButtonContainer>
      </DialogBox>
      <Backdrop onClick={hadleCancle} />
    </ModalContainer>
  );
};

export default MatPickerCreate;
