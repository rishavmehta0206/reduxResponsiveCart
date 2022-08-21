import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Confirm from "../components/Confirm";
import { removeItemFromCart } from "../redux/productSlice";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
`;

const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Product = styled.div`
  width: 100%;
  height: 200px;
  margin: 30px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ImageContainer = styled.div`
  width: 30%;
  height: 80%;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
  padding: 0px 20px;
`;

const Title = styled.h1`
  font-size: 18px;
  text-decoration: underline;
`;

const DescriptionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Price = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Button = styled.button`
  border: 1px solid black;
  background: transparent;
  padding: 10px;
  font-weight: 700;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

const Description = styled.p`
  letter-spacing: 2px;
`;
const CartTotal = styled.div`
  border-top: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
`;
const Popup = styled.div`
  height: 100%;
  width: 100%;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Cost = styled.div``;
const Cart = () => {
  const { cartItems, total } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(true);
  const removeProduct = (product) => {
    dispatch(removeItemFromCart(product));
  };
  return (
    <Container>
      {openPopUp && (
        <Popup>
          <Confirm setOpenPopUp={setOpenPopUp} />
        </Popup>
      )}
      {cartItems.length > 0 ? (
        <>
          <Wrapper>
            {cartItems.map((item) => {
              return (
                <>
                  <Product>
                    <ImageContainer>
                      <Image src={item.image} />
                    </ImageContainer>
                    <InfoContainer>
                      <Title>{item.title}</Title>
                      <Description>{item.description}</Description>
                      <DescriptionFooter>
                        <Price>${item.price}</Price>
                        <Button onClick={() => removeProduct(item)}>
                          remove
                        </Button>
                      </DescriptionFooter>
                    </InfoContainer>
                  </Product>
                </>
              );
            })}
          </Wrapper>
          <CartTotal>
            <Cost>${total}</Cost>
            <ButtonContainer>
              <Button
                color="white"
                onClick={() => dispatch(removeItemFromCart())}
              >
                remove all
              </Button>
              <Button onClick={() => setOpenPopUp(true)} color="lightblue">
                confirm order
              </Button>
            </ButtonContainer>
          </CartTotal>
        </>
      ) : (
        <p>cart is empty.</p>
      )}
    </Container>
  );
};

export default Cart;
