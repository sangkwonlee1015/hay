import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  position: absolute;
  width: 100%;
  height: 48px;
  left: 0px;
  top: 0px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);

  line-height: 48px;
  text-align: center;
  font-size: 16px;
`;

function HeaderOnlyText(props) {
  return (
    <Header>
      {props.text}
    </Header>
  )
}

export default HeaderOnlyText