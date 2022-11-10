// 둥근 모서리 사각형, 화면 가로의 1/3, 선택 시 짙은 파란색, 기본 밝은 하늘색

import { Button } from "@mui/material";
import React from "react";

function Category(props) {
  return (
    <div>
      <Button
        onClick={() => {
          props.onChangeCategory(props.id);
        }}
      >
        {props.name}
      </Button>
    </div>
  );
}

export default Category;
