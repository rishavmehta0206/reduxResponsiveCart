import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  height: 80%;
  width: 60%;
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 0px 0px 20px 0px;
  padding: 10px;
  outline: none;
`;

const Form = styled.div`
  height: 50%;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const OrderInfo = styled.div`
  height: 50%;
  width: 80%;
  display: flex;
  flex-direction: column;
`;
const OrderDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Price = styled.div``;
const Quantity = styled.div``;
const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;
const Button = styled.button`
  padding: 10px;
  background: transparent;
`;
const Close = styled.div`
  position: absolute;
  height: 40px;
  width: 40px;
  background-color: lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  right: 10px;
  top: 5px;
`;
const Confirm = ({ setOpenPopUp }) => {
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpenPopUp(false)}>X</Close>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="address" />
          <Input placeholder="contact number" />
        </Form>
        <OrderInfo>
          <OrderDetails>
            <Price>$1</Price>
            <Quantity>2</Quantity>
          </OrderDetails>
          <ButtonContainer>
            <Button>Place Order.</Button>
          </ButtonContainer>
        </OrderInfo>
      </Wrapper>
    </Container>
  );
};

export default Confirm;
