// 만들기 취소 아이콘, 투표 만들기, 카테고리
// 제목 인풋
// 주제 - 카테고리 선택
// 사진 추가
// 본문
// 투표 설정
//   기간 선택
//   항목 입력 min:2, 항목 추가하기
// 댓글 허용 스위치
// 만들기

import React from 'react'
import './VoteCreate.css'
import TextField from '@mui/material/TextField';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import HeaderOnlyText from '../../components/HeaderOnlyText';
import HowToVoteIcon from "@mui/icons-material/HowToVote";



function VoteCreate() {
  const [alignment, setAlignment] = React.useState("category");
  const categoryHandleChange = (event, newAlignment) => {setAlignment(newAlignment)};
  const [term, setTerm] = React.useState("");

  const termHandleChange = (event) => {
    setTerm(event.target.value);
  };

  /** 항목 추가하기 누를 시 항목 추가해주는 함수 */
  const selectionAdd = () => {
    let result = (<div></div>)

    result.div.push(
      <TextField id="outlined" placeholder="" />
    )

    return result;
  }

  return (
    <div>
      <HeaderOnlyText text="투표 만들기"/>
      <div className="titleSpace">
        <TextField
          id="standard-basic"
          label="제목을 입력해주세요"
          variant="standard"
          sx={{
            width: "86%;",
            marginLeft: "7%;"
          }}
        />
      </div>
      <div className="voteCreateCategory">
        <div>주제</div>
        <div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={categoryHandleChange}
            aria-label="Category"
            required={true}
            sx={{
              marginLeft: "30px;"
            }}
          >
            <ToggleButton value="story">이야기</ToggleButton>
            <ToggleButton value="foods">먹자지껄</ToggleButton>
            <ToggleButton value="daily">매일매일</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      {/* <div className="addPhoto">사진 추가하기</div> */}
      <div>
        <TextField
          id="outlined-multiline-static"
          multiline
          minRows={4}
          placeholder="본문을 입력해주세요"
          sx={{
            width: "86%;",
            marginLeft: "7%;",
            marginBottom: "16px;"
          }}
        />
      </div>
      <div className="voteCreate">
        <div className="voteCreateTitle">
          <HowToVoteIcon color="primary" fontSize="small" />
          <div className="voteText">투표</div>
        </div>
        <div className="voteCreateTermSelect">
          <FormControl fullWidth sx={{ width: "86%;" }}>
            <InputLabel id="demo-simple-select-label">기간 선택</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={term}
              label="Term"
              onChange={termHandleChange}
              
            >
              <MenuItem value={1}>24시간</MenuItem>
              <MenuItem value={3}>3일</MenuItem>
              <MenuItem value={7}>7일</MenuItem>
              <MenuItem value={15}>15일</MenuItem>
              <MenuItem value={30}>30일</MenuItem>
            </Select>
          </FormControl>
        </div>
        <hr className="horizon"></hr>
        <div>
          <TextField required id="selection-1" sx={{ width: "86%;", marginLeft: "20px;" }} placeholder="항목 1" />
          <TextField required id="selection-2" sx={{ width: "86%;", marginLeft: "20px;", marginTop: "12px;" ,marginBottom: "12px;" }} placeholder="항목 2" />
          {/* {selectionAdd()} */}
          <Button variant="outlined" onClick={() => {}} sx={{ width: "86%;", marginLeft: "20px;", padding: "16px 0px;" }}>
            항목 추가하기
          </Button>
        </div>
      </div>
      <div>
        <FormControlLabel
          value="allowComment"
          control={<Switch color="primary" defaultChecked />}
          label="댓글 허용"
          labelPlacement="start"
          sx={{ marginLeft: "28px;", marginButtom: "32px;" }}
        />
      </div>
      <div className="voteCreateSubmitButton">만들기</div>
    </div>
  );
}

export default VoteCreate