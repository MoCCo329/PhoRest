import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";


const ModalBasic = (props) => {
  const noLine = {
    borderTop: 'none'
  }

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Body>{props.text}</Modal.Body>
        <Modal.Footer style={noLine}>
          <Button variant="secondary" onClick={props.onHide}>
            취소
          </Button>
          <Button variant="secondary" onClick={props.action}>
            {props.todo}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const Button = styled.button`
  border: none;
  border-radius: 50px;
  height: 2em;
  width: 5em;
  margin: 0;
  background: none;
  color: black;
  font-size: 1rem;
  font-family: "Pretendard-Regular";
`;

export default ModalBasic