import { textAlign } from '@mui/system';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";


const ModalConfirm = (props) => {
  const noLine = {
    borderTop: 'none'
  }

  const modalBody = {
    fontFamily: "Pretendard-Regular",
  }

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Body style={modalBody}>{props.text}</Modal.Body>
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
  margin: 0.5em;
  background-color: #fff7e7;
  color: black;
  font-size: 1rem;
  font-family: "Pretendard-Regular";

  &:hover {
    background-color: #ffc036;
    cursor: pointer;
  }
`;

export default ModalConfirm