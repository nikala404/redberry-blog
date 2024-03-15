import { LogInButton, NavBar } from "./DesktopPage";
import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BlogItem } from "../DesktopPageComponents/CardContainer";
import redBerryLogo from "../assets/LOGO-02 3.png";
import LoginWindow from "../DesktopPageComponents/LoginWindow";
import { UserContext } from "../App";
import CardComponent from "../DesktopPageComponents/Card";
import SimilarBlogsSlider from "../BlogComponents/SimilarBlogsSlider";

const BlogInformation = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SelectedFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.47rem;
  margin-bottom: 10px;
  span {
    cursor: default;
  }

  h6 {
    cursor: default;
  }
`;

const BlogStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  max-width: 720px;
  border-radius: 12px;

  img {
    max-height: 328px;
    max-width: 720px;
    width: 100%;
    border-radius: 12px;
  }

  p {
    font-family: FiraGO;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    width: 100%;
    color: #404049;
    margin-top: 0px;
    height: auto;
    word-break: break-all;
  }
  h3 {
    height: auto;
    font-family: FiraGO;
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    word-break: break-all;
    overflow: visible;
    white-space: normal;
    text-overflow: unset;
    margin: 10px 0;
  }
  h4 {
    display: flex;
    height: auto;
    flex-wrap: wrap;
    margin-bottom: 5px;
    font-family: FiraGO;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    word-break: break-all;
  }
  a {
    display: none !important;
  }
  h6 {
    font-weight: 700;
    margin: 0;
  }
  span {
    padding: 10px 10px;
  }
`;

const Header = styled.header`
  padding: 20px 20px;

  button {
    background-color: #5d37f3;
    color: white;
    border: none;

    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
  }
  input {
    padding: 0 10px;
  }
  h1 {
    margin: 0;
  }
`;
interface Blog {
  id: number;
  publish_date: string;
  categories: { title: string }[];
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  const [isClickedOnLogInButton, setIsClickedOnLogInButton] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [requestStatus, setRequestStatus] = useState<number>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios
        .get("https://api.blog.redberryinternship.ge/api/blogs", {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer 81f6285e53362cd90d08045eb5da8b78d96d0a836bd9d04cd7c78950b8dfdce3",
          },
        })
        .then((res) => {
          setBlogs(res.data.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const reset = () => {
    setIsClickedOnLogInButton(!isClickedOnLogInButton);
  };

  const handleClick = () => {
    setIsClickedOnLogInButton(true);
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

  let { state } = useLocation();

  const context = useContext(UserContext);

  useEffect(() => {
    if (user.loggedIn) {
      context?.setIsLoggedIn(true);
    }
  }, [requestStatus]);

  const currentDate = new Date();
  const selectedTags = blogs.filter((item) => item.id === state.id);

  const similarBlogs = blogs.filter(
    (blog: Blog) =>
      blog.id !== state.id &&
      new Date(blog.publish_date) <= currentDate &&
      selectedTags.some((tag) =>
        blog.categories.some((category: { title: string }) =>
          tag.categories.some(
            (tagCategory: { title: string }) =>
              category.title === tagCategory.title
          )
        )
      )
  );

  const navigate = useNavigate();

  return (
    <>
      <Header>
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
          <img
            src={redBerryLogo}
            alt="redberry_logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />

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
      </Header>
      <BlogInformation>
        <BlogStyles>
          {blogs.map((item: BlogItem) => {
            return item.id === state?.id ? (
              <CardComponent
                isSlicedTags={false}
                blog={item}
                key={item.id}
                id={item.id.toString()}
              />
            ) : null;
          })}
        </BlogStyles>
        <SimilarBlogsSlider similarBlogs={similarBlogs} />
      </BlogInformation>
    </>
  );
}
