/* eslint-disable */

import { useParams } from "react-router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { postUpdate } from "../../utils/API";
import MatEditor from "./MatEditor";
import StarRate from "./StarRate";
import UsePlacesPostsAxios from "../../utils/usePlacesPostsAxios";
import axios from "axios";

const StyledModal = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 1400px;
  height: 800px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 10%;
  left: 15%;
  z-index: 999;

  > span.close-btn {
    margin: 5px 0px 0px 1375px;
    cursor: pointer;
    font-size: 30px;
  }
`;

const StyledDiv = styled.div`
  margin: 25px 100px 10px 100px;
  height: auto;
  display: flex;
  flex-direction: column;

  input {
    width: 100%;
    line-height: 25px;
    border: none;
    font-size: 20px;
  }

  .middle_line {
    border: 0;
    width: 100%;
    height: 1.3px;
    background: #b8b8b8;
    margin: 20px 0px 20px 0px;
  }

  input:focus {
    outline: none;
  }

  .ql-container.ql-snow {
    height: 450px;
  }

  .ql-editor p strong {
    font-weight: bold;
  }

  .ql-editor p em {
    font-style: italic;
  }

  .buttons {
    margin: 30px 0px 15px 530px;

    button {
      width: 100px;
      height: 35px;
      background-color: #874356;
      color: #ffffff;
      border: none;
      border-radius: 30px;
      font-size: 15px;
    }

    button:hover {
      font-weight: 700;
    }
  }
`;

const StyledStarsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0px 0px 0px;
`;

const StyledRatingtxt = styled.div`
  color: #787878;
  font-size: 14px;
  font-weight: 400;
`;

const StyledStar = styled.div`
  display: flex;
  width: 125px;
  padding: 5px 0px 0px 0px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellow {
    color: #fcc419;
  }
`;

interface IPost {
  id: number;
  nickname: string;
  profileimg: string;
  title: string;
  content: string;
  createdat: string;
  star: number;
}

const PostUpdateModal = ({}: // closeModalHandler,
{
  // closeModalHandler?: React.MouseEventHandler;
}) => {
  const { id } = useParams();

  // 기존 데이터 받아오기
  const [newTitle, setNewTitle] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    try {
      axios
        .get<IPost>(`http://localhost:3001/placesposts/${id}`)
        .then((res) => {
          console.log(res.data);
          setNewTitle(res.data.title);
          setHtmlContent(res.data.content);
          setClicked(new Array(5).fill(true, 0, res.data.star));
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(newTitle);
  console.log(htmlContent);
  console.log(clicked);

  // 항상 별이 총 5개(더미 array)
  const array: Array<number> = [0, 1, 2, 3, 4];

  // 제목 input 창
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // '게시' 버튼 누를 시 post 업로드
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (newTitle.length > 0 && htmlContent.length > 0) {
      postUpdate(
        newTitle,
        htmlContent,
        new Date().toLocaleString(),
        clicked.filter(Boolean).length,
        Number(id)
      );
    }
  };

  /**
   * 클릭한 별의 순서까지를 별점의 총점으로 저장해주는 함수
   * @param index 클릭한 별의 순서
   */
  const handleStarClick = (index: number) => {
    const clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  return (
    <StyledModal>
      <span
        role="presentation"
        // onClick={closeModalHandler}
        className="close-btn"
      >
        &times;
      </span>
      <StyledDiv>
        <input
          placeholder="제목을 입력해주세요"
          value={newTitle}
          onChange={handleInput}
        ></input>
        <hr className="middle_line" />
        <MatEditor htmlContent={htmlContent} setHtmlContent={setHtmlContent} />
        <StyledStarsWrapper>
          <StyledRatingtxt>평점</StyledRatingtxt>
          <StyledStar>
            {array.map((el, idx) => {
              return (
                <StarRate
                  key={idx}
                  size="50"
                  onClick={() => handleStarClick(el)}
                  className={clicked[el] ? "yellow" : ""}
                />
              );
            })}
          </StyledStar>
        </StyledStarsWrapper>
        <div className="buttons">
          <button onClick={handleClick}>수정</button>
        </div>
      </StyledDiv>
    </StyledModal>
  );
};

export default PostUpdateModal;
