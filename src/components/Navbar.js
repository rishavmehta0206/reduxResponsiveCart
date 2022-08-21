import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  height: 70px;
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const CartContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;
const Icon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CartCount = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: teal;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -2px;
  left: 27px;
`;

const RouteContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: end;
  &>a{
    font-size: 25px;
  }
`;

const Navbar = () => {
  const { count } = useSelector((state) => state.products);
  return (
    <Container>
      <Wrapper>
        <CartContainer>
          <Icon>
            <i className="fa fa-solid fa-cart-shopping"></i>
          </Icon>
          <CartCount>{count}</CartCount>
        </CartContainer>
        <RouteContainer>
          <NavLink to="/">
            <i className="fa fa-solid fa-house"></i>
          </NavLink>
          <NavLink to="/cart">
            <i className="fa fa-solid fa-cart-shopping"></i>
          </NavLink>
        </RouteContainer>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
