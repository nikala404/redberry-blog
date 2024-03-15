import redBerryLogo from "../assets/LOGO-02 3.png";
import Form from "../BlogAddingComponents/Form";
import { styled, createGlobalStyle } from "styled-components";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const GlobalStyle = createGlobalStyle`
    
    body{
        display:flex;
        justify-content:center;
        align-items:center;
    }
`;
const FormContainer = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
`;
export default function BlogAddingForm() {
  const context = useContext(UserContext);

  if (!context?.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <GlobalStyle />
      <header
        style={{
          padding: "20px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={redBerryLogo} alt="" />
      </header>

      <svg
        onClick={() => window.history.back()}
        style={{
          position: "absolute",
          zIndex: "1",
          left: "10px",
          top: "30px",
          cursor: "pointer",
        }}
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="44" height="44" rx="22" fill="#E4E3EB" />
        <path
          d="M18 23C18.5523 23 19 22.5523 19 22C19 21.4477 18.5523 21 18 21L18 23ZM17.1929 21.2929C16.8024 21.6834 16.8024 22.3166 17.1929 22.7071L23.5569 29.0711C23.9474 29.4616 24.5805 29.4616 24.9711 29.0711C25.3616 28.6805 25.3616 28.0474 24.9711 27.6569L19.3142 22L24.9711 16.3431C25.3616 15.9526 25.3616 15.3195 24.9711 14.9289C24.5805 14.5384 23.9474 14.5384 23.5569 14.9289L17.1929 21.2929ZM18 21L17.9 21L17.9 23L18 23L18 21Z"
          fill="#1A1A1F"
        />
      </svg>

      <FormContainer>
        <h1>ბლოგის დამატება</h1>
        <Form />
      </FormContainer>
    </>
  );
}