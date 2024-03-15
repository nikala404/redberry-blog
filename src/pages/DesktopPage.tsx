import { useContext, useEffect, useState } from "react";
import { styled, createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import redBerryLogo from "../assets/LOGO-02 3.png";
import axios from "axios";
import LoginWindow from "../DesktopPageComponents/LoginWindow";
import CardContainer from "../DesktopPageComponents/CardContainer";
import Filters from "../DesktopPageComponents/Filter";
import HeroComponent from "../DesktopPageComponents/Hero";
import { UserContext } from "../App";

export const GlobalStyle = createGlobalStyle`
        *{
            padding: 0px;
            margin:0px;
            box-sizing:border-box;
            font-family: 'FiraGO', sans-serif;
        }
        body{
            padding: 0px 40px 20px ;
        }

`;

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
  border-bottom: 1px solid lightgray;
`;

export const LogInButton = styled.button`
  background-color: #5d37f3;
  color: white;
  border: none;
  padding: 10px 23px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
interface CategoriesData {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

interface CategoriesResponse {
  data: CategoriesData[];
}
export default function DesktopPage() {
  const [categories, setCategories] = useState<CategoriesData[]>([]);
  const [isClickedOnLogInButton, setIsClickedOnLogInButton] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [requestStatus, setRequestStatus] = useState<number>();
  const [_, setCurrentFilter] = useState<number>();
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);

  const handleClick = () => {
    setIsClickedOnLogInButton(true);
  };

  const handlePagination = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const clickedFilter = parseInt(e.currentTarget.id);
    setCurrentFilter(clickedFilter);

    if (selectedFilters.includes(clickedFilter)) {
      setSelectedFilters(
        selectedFilters.filter((filterId) => filterId !== clickedFilter)
      );
    } else {
      setSelectedFilters([...selectedFilters, clickedFilter]);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const reset = () => {
    setIsClickedOnLogInButton(!isClickedOnLogInButton);
  };

  let user = {
    email: inputValue,
    loggedIn: requestStatus === 204 ? true : false,
  };
  if (requestStatus && requestStatus >= 200 && requestStatus < 300) {
    window.localStorage.setItem(inputValue, JSON.stringify(user));
  }
  let storedUser = window.localStorage.getItem(inputValue);
  if (storedUser) {
    user = JSON.parse(storedUser);
  }

  useEffect(() => {
    axios
      .get<CategoriesResponse>(
        "https://api.blog.redberryinternship.ge/api/categories",
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => setCategories(res.data.data));
  }, []);
  const context = useContext(UserContext);
  useEffect(() => {
    if (user.loggedIn) {
      context?.setIsLoggedIn(true);
    }
  }, [requestStatus]);

  return (
    <>
      <GlobalStyle />
      <main>
        {isClickedOnLogInButton ? (
          <LoginWindow
            onClickSvg={() => {
              reset();
            }}
            successfulAuth={() => {
              reset();
            }}
            onClickButton={() => {
              axios
                .post("https://api.blog.redberryinternship.ge/api/login", {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  email: inputValue,
                })
                .then((res) => {
                  setRequestStatus(res.status);
                })
                .catch((err) => setRequestStatus(err.response.status));
            }}
            value={inputValue}
            onChange={handleValueChange}
            responseStatus={requestStatus}
          />
        ) : null}

        <NavBar>
          <img src={redBerryLogo} alt="redberry_logo" />
          {context?.isLoggedIn ? (
            <LogInButton>
              <Link
                to="/blog_form"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                ბლოგის დამატება
              </Link>
            </LogInButton>
          ) : (
            <LogInButton onClick={handleClick}>შესვლა</LogInButton>
          )}
        </NavBar>
        <HeroComponent />
        <FilterWrapper>
          {categories.length > 0 &&
            categories.map((item) => (
              <Filters
                key={item.id}
                selectedFilterId={selectedFilters}
                onClick={handlePagination}
                filter={item}
                id={item.id.toString()}
              />
            ))}
        </FilterWrapper>

        <CardContainer selectedFilters={selectedFilters} />
      </main>
    </>
  );
}
