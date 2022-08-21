import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromAPI } from "./redux/productSlice";
import styled from "styled-components";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { addItemToCart } from "./redux/productSlice";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Cart from "./pages/Cart";
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
  position: relative;
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

const ProductDescriptionContainer = styled.div`
  display: flex;
  position: absolute;
`;
const ProductDescriptionMessage = styled.div`
  background-color: lightgrey;
  width: 200px;
  font-weight: bolder;
  display: flex;
  opacity: 0;
  align-items: center;
  justify-content: center;
`;
const ProductDescription = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  top: 30px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    ${ProductDescriptionMessage} {
      opacity: 1;
      animation-name: showDescription;
      animation-fill-mode: forwards;
      animation-duration: 3s;
    }
  }
  @keyframes showDescription {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(30px);
    }
  }
`;

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
  position: relative;
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
    margin: 10px 5px;
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

const ModalContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  z-index: 999;
  position: absolute;
  top: 10px;
  align-items: center;
  animation-name: slide;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  @keyframes slide {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(100px);
    }
  } ;
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

const Home = () => {
  const dispatch = useDispatch();
  const [modalControl, setModalControl] = useState(false);
  const { products, isLoading, isError } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(fetchDataFromAPI());
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setModalControl(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [modalControl]);
  const addItem = (product) => {
    setModalControl(true);
    dispatch(addItemToCart(product));
  };
  return (
    <>
      <Container>
        {modalControl && (
          <ModalContainer>
            <Modal />
          </ModalContainer>
        )}
        <Wrapper>
          {products.map((product) => {
            return (
              <Products>
                <ProductDescriptionContainer>
                  <ProductDescription>
                    <i className="fa fa-solid fa-angle-down"></i>
                  </ProductDescription>
                  <ProductDescriptionMessage>
                    Description
                  </ProductDescriptionMessage>
                </ProductDescriptionContainer>
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
                  <ProductOrder onClick={() => addItem(product)}>
                    SHOP NOW
                  </ProductOrder>
                </ProductContentContainer>
              </Products>
            );
          })}
        </Wrapper>
      </Container>
    </>
  );
};
