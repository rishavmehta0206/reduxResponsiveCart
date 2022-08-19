import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromAPI } from "./redux/productSlice";
import styled from "styled-components";
const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
`;
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductImageContainer = styled.div`
  width: 100%;
`;
const Image = styled.img``;
const ProductContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const ProductTitle = styled.div`
  font-size: 15px;
  letter-spacing: 2px;
`;
const ProductDescription = styled.p``;

const ProductDetails = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ProductCost = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ProductRating = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ProductOrders = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ProductOrder = styled.button`
  margin: 20px;
  padding: 10px;
  background: transparent;
  cursor: pointer;
  &:hover {
    background-color: lightblue;
    color: white;
    font-size: bold;
    border: 1px solid lightblue;
  }
`;
const Products = styled.div`
  text-align: center;
  @media (max-width: 560px) and (min-width: 400px) {
    width: 100%;
    display: flex;
    height: 400px;
    ${ProductContentContainer} {
      width: 60%;
    }
    ${ProductImageContainer} {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      ${Image} {
        height: 80%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
  @media (max-width: 780px) and (min-width: 560px) {
    width: 48%;
    display: flex;
    height: 400px;
    flex-direction: column;
    margin: 10px 5px;
    ${ProductImageContainer} {
      height: 60%;
      display: flex;
      align-items: center;
      justify-content: center;
      ${Image} {
        height: 80%;
        width: 100%;
        object-fit: cover;
      }
    }
    ${ProductContentContainer} {
      height: 40%;
      padding: 10px;
      display: flex;
      ${ProductTitle} {
        font-size: 14px;
        margin-bottom: 10px;
      }
      ${ProductDescription} {
        font-size: 15px;
        margin-bottom: 10px;
      }
      ${ProductCost > ProductRating > ProductOrders} {
        font-size: 14px;
      }
    }
    ${ProductOrder} {
      justify-content: end;
    }
  }
  @media (max-width: 1122px) and (min-width: 780px) {
    width: calc(33% - 20px);
    margin-bottom: 20px;
    height: 400;
    display: flex;
    flex-direction: column;
    margin: 10px 5px;
    ${ProductImageContainer} {
      height: 60%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      ${Image} {
        height: 80%;
        width: 100%;
        object-fit: cover;
      }
    }
    ${ProductContentContainer} {
      height: 40%;
      padding: 10px;
      ${ProductTitle} {
        font-size: 16px;
      }
      ${ProductDescription} {
        font-size: 15px;
      }
      ${ProductCost > ProductRating > ProductOrders} {
        font-size: 14px;
      }
    }
  }
  @media (min-width: 1122px) {
    width: 23%;
    margin-bottom: 20px;
    height: 400px;
    display: flex;
    flex-direction: column;
    ${ProductImageContainer} {
      height: 60%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      ${Image} {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    ${ProductContentContainer} {
      height: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 10px;
      ${ProductTitle} {
        font-size: 16px;
      }
      ${ProductDescription} {
        font-size: 15px;
      }
      ${ProductCost > ProductRating > ProductOrders} {
        font-size: 14px;
      }
    }
  }
`;

function App() {
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(fetchDataFromAPI());
  }, []);
  return (
    <Container>
      <Wrapper>
        {products.map((product) => {
          return (
            <Products>
              <ProductImageContainer>
                <Image src={product.image} />
              </ProductImageContainer>
              <ProductContentContainer>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDetails>
                  <ProductCost>
                    <label>Cost:</label>
                    <div>
                      <i className="fa fa-solid fa-dollar-sign"></i>
                      {product.price}
                    </div>
                  </ProductCost>
                  <ProductRating>
                    <label>Rating:</label>
                    <div>
                      <i className="fa fa-solid fa-star"></i>
                      {product.rating.rate}
                    </div>
                  </ProductRating>
                  <ProductOrders>
                    <label>Orders:</label>
                    <div>
                      <i className="fa fa-solid fa-bag-shopping"></i>
                      {product.rating.count}
                    </div>
                  </ProductOrders>
                </ProductDetails>
                <ProductOrder>SHOP NOW</ProductOrder>
              </ProductContentContainer>
            </Products>
          );
        })}
      </Wrapper>
    </Container>
  );
}

export default App;
