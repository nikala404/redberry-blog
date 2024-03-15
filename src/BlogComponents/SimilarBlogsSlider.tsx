import styled from "styled-components";

import Card from "../DesktopPageComponents/Card";

import { BlogItem } from "../DesktopPageComponents/CardContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.section`
  position: relative;
  display: flex;
  max-width: 1540px;
  width: 100%;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`;

const Controller = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: -webkit-fill-available;
  span {
    width: 80px;
    display: flex;
    justify-content: space-between;
  }

  button {
    border-radius: 50%;
    width: 35px;
    height: 32px;
    border: none;
    cursor: pointer;
    color: #ffffff;
    background: #e4e3eb;
  }

  h2 {
    font-family: FiraGO;
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1f;
  }
`;
const Blog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  border-radius: 12px;
  width: 100%;

  a {
    display: flex;
    text-decoration: none;
    font-weight: 500;
    align-items: center;
    font-family: FiraGO;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #5d37f3;
    cursor: pointer;
  }
  p {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: FiraGO;
    font-size: 16px;
    font-weight: 400;
    width: 100%;
    margin: 0px;
  }
  h3 {
    height: 25px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px;
    font-family: FiraGO;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
  }
  h4 {
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px;
    font-family: FiraGO;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
  }
  span {
    padding: 10px 10px;
  }
  h6 {
    margin: 0;
  }
  .anchor_span {
    padding: 0;
  }
`;

export default function SimilarBlogsSlider({
  similarBlogs,
}: {
  similarBlogs: BlogItem[];
}) {
  const [currentBlog, setCurrentBlog] = useState(0);

  const navigate = useNavigate();

  if (!similarBlogs.length) return null;

  return (
    <>
      <Controller>
        <h2>მსგავსი პოსტები</h2>{" "}
        <span>
          <button
            onClick={() =>
              setCurrentBlog((prev) => (prev === 0 ? prev : prev - 1))
            }
            style={{ backgroundColor: currentBlog !== 0 ? "#5D37F3" : "" }}
          >
            &larr;
          </button>
          <button
            onClick={() =>
              setCurrentBlog((prev) =>
                prev >= similarBlogs.length / 3 - 1 ? prev : prev + 1
              )
            }
            style={{
              backgroundColor:
                currentBlog < similarBlogs.length / 3 - 1 ? "#5D37F3" : "",
            }}
          >
            &rarr;
          </button>
        </span>
      </Controller>
      <Container>
        {similarBlogs
          .slice(currentBlog * 3, currentBlog * 3 + 3)
          .map((item) => {
            return (
              <Blog key={item.id}>
                <Card
                  isSlicedTags={true}
                  blog={item}
                  id={item.id.toString()}
                  onClick={() => {
                    navigate(`/blog/:${item.id}`, {
                      state: {
                        id: item.id,
                      },
                    }),
                      setCurrentBlog(0);
                  }}
                />
              </Blog>
            );
          })}
      </Container>
    </>
  );
}
