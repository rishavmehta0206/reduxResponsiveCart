import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 40%;
  height: 40px;
  position: sticky;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: green;
`;
const ModalText = styled.div``;

const Modal = () => {
  return (
    <Container>
      <Wrapper>
        <ModalText>Item added to cart.</ModalText>
      </Wrapper>
    </Container>
  );
};

export default Modal;
