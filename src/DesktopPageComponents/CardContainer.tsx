import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { useNavigate } from "react-router-dom";
import CardComponent from "./Card";

const CardContianer = styled.div`
  display: flex;
  margin-top: 3rem;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  div {
    max-width: 430px;
  }
  span {
    max-width: 408px;
  }
  span p,
  h3,
  h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span img {
    max-height: 328px;
    min-height: 328px;
    border-radius: 12px;
    width: 100%;
  }
`;

export interface BlogItem {
  id: number;
  title: string;
  author: string;
  image: string;
  publish_date: string;
  description: string;
  categories: [];
}

interface CardProps {
  selectedFilters: number[];
}

export default function CardContainer({ selectedFilters }: CardProps) {
  const [blogs, setBlogs] = useState([]);

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

  const currentDate = new Date();

  const filterBlogs = (blog: { categories: { id: number }[] }) => {
    if (!selectedFilters.length) return true;

    return blog.categories.some((category: { id: number }) =>
      selectedFilters.includes(category.id)
    );
  };

  const navigate = useNavigate();
  return (
    <CardContianer>
      {blogs
        ?.filter(filterBlogs)
        .filter((item: BlogItem) => new Date(item.publish_date) <= currentDate)
        .map((item: BlogItem) => (
          <CardComponent
            isSlicedTags={true}
            key={item.id}
            blog={item}
            onClick={() => {
              navigate(`/blog/:${item.id}`, {
                state: {
                  id: item.id,
                },
              });
            }}
            id={item.id.toString()}
          />
        ))}
    </CardContianer>
  );
}
