import React from "react";
import Filters from "./Filter";
import { SelectedFilters } from "../pages/Blog";
import { styled } from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  border-radius: 12px;
  width: 100%;
  img {
    max-height: 328px;
    min-height: 328px;
    border-radius: 12px;
    width: 100%;
  }
  a {
    display: flex;
    text-decoration: none;
    font-weight: 500;
    align-items: center;
    color: #5d37f3;
    cursor: pointer;
  }
  p {
    display: inline-block;
    font-family: FiraGO;
    font-size: 16px;
    font-weight: 400;
    width: 100%;
  }
  time {
    font-family: FiraGO;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

interface CardComponentProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  id: string;
  blog: {
    id: number;
    title: string;
    author: string;
    image: string;
    publish_date: string;
    description: string;
    categories: [];
  };
  isSlicedTags: boolean;
}
export default function CardComponent({
  blog,
  onClick,
  id,
  isSlicedTags,
}: CardComponentProps) {
  return (
    <Card key={blog.id}>
      <img src={blog.image} alt="blog_pic" loading="lazy" />
      <span>
        <h4>{blog.author}</h4>
        <time>{blog.publish_date}</time>
      </span>
      <h3>{blog.title}</h3>
      <SelectedFilters>
        {blog.categories && blog.categories.length > 2 && isSlicedTags
          ? blog.categories
              .slice(0, 2)
              .map((filter: { id: number }) => (
                <Filters key={filter.id} filter={filter} />
              ))
          : blog.categories.map((filter: { id: number }) => (
              <Filters key={filter.id} filter={filter} />
            ))}

        {blog.categories && blog.categories.length > 2 && isSlicedTags ? (
          <span
            style={{
              borderRadius: "50%",
              background: "#b11cd63b",
              padding: "3px",
              fontSize: "14px",
            }}
          >
            +{blog.categories && blog.categories.length - 2}
          </span>
        ) : null}
      </SelectedFilters>
      <div>
        <p
          id="description"
          style={{
            height: "40px",
          }}
        >
          {blog.description}
        </p>
        <a>
          <span className="anchor_span">
            <a onClick={onClick} id={id}>
              სრულად ნახვა
            </a>
          </span>{" "}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.93415 13.0052C5.64125 13.2981 5.64125 13.773 5.93415 14.0659C6.22704 14.3587 6.70191 14.3587 6.99481 14.0659L5.93415 13.0052ZM14.2855 6.46446C14.2855 6.05024 13.9498 5.71445 13.5355 5.71446L6.78555 5.71445C6.37133 5.71445 6.03555 6.05024 6.03555 6.46445C6.03555 6.87867 6.37133 7.21445 6.78555 7.21445H12.7855V13.2145C12.7855 13.6287 13.1213 13.9645 13.5355 13.9645C13.9498 13.9645 14.2855 13.6287 14.2855 13.2145L14.2855 6.46446ZM6.99481 14.0659L14.0659 6.99478L13.0052 5.93412L5.93415 13.0052L6.99481 14.0659Z"
              fill="#5D37F3"
            />
          </svg>
        </a>
      </div>
    </Card>
  );
}
