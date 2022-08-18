import React from "react"
import styled from "styled-components"
import top from '../../assets/UI/top.png'

const FloatingBtn = styled.div`
  position: fixed;
  line-height: 63px;
  bottom: 5em;
  right: 3em;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    bottom: 3em;
    right: 1em
}
`

function FloatBtn() {
    const imgSize = {
        width: '2em',
        height: '2em'
    }
  return (
    <>
      <FloatingBtn>
        <img src={top} alt='top' style={imgSize}></img>
      </FloatingBtn>
    </>
  )
}

export default FloatBtn