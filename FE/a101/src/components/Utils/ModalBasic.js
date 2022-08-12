import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";


const ModalBasic = (props) => {
  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  useEffect(() => {
    setShow(props.show)
  }, [props.show])

  return (
    <>
      <Modal show={show}>
        <Modal.Body>{props.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            확인
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
  width: 2em;
  margin: 0;
  background: none;
  color: black;
  font-size: 1rem;
  font-family: "Pretendard-Regular";
`;

export default ModalBasic