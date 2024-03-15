import { useEffect, useState } from "react";
import { Label } from "./Caption";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  position: relative;
  width: 286px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid #e4e3eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const Filter = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 10px 15px;
  border-radius: 15px;
  height: 15px;
  cursor: pointer;

  border: none;
  font-family: FiraGO;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  font-size: 20px;
  h6 {
    margin: 0;
  }
`;
const SelectedTags = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 8px;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-x: scroll;
`;
const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 286px;
  border-radius: 12px;
  border: 1px solid #e4e3eb;
  padding: 10px 10px;
  height: auto;
  gap: 8px;
  margin-top: 5px;
`;
interface CategoriesData {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}
export default function Categories({
  onValidityChange,
  selectedIds,
}: {
  onValidityChange: (isValid: boolean) => void;
  selectedIds: (tag: number[]) => void;
}) {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [categories, setCategories] = useState<CategoriesData[]>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [_, setSelectedTagId] = useState<number>();

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleTagClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const clickedTagId = parseInt(e.currentTarget.id);
    setSelectedTagId(clickedTagId);

    if (selectedTags.includes(clickedTagId)) {
      setSelectedTags(selectedTags.filter((tagId) => tagId !== clickedTagId));
      selectedIds(selectedTags.filter((tagId) => tagId !== clickedTagId));
    } else {
      setSelectedTags([...selectedTags, clickedTagId]);
      selectedIds([...selectedTags, clickedTagId]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://api.blog.redberryinternship.ge/api/categories", {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => setCategories(res.data.data))
      .catch((error) => console.error("Error fetching data:", error));
  };
  const isValid = selectedTags.length > 0 ? true : false;
  onValidityChange(isValid);

  return (
    <main>
      <Label htmlFor="category">კატეგორია *</Label>
      <Container
        id="categories"
        style={{
          border:
            selectedTags.length > 0
              ? "1px solid lightgreen"
              : "1px solid #e4e3eb",
        }}
      >
        <SelectedTags
          style={{
            display: "flex",
          }}
        >
          {selectedTags.length > 0
            ? selectedTags.map((id) => (
                <Filter
                  onClick={handleTagClick}
                  id={categories[Number(id) - 1].id.toString()}
                  style={{
                    backgroundColor: `${
                      categories[Number(id) - 1].background_color
                    }`,
                  }}
                >
                  <h6
                    style={{
                      color: `${categories[Number(id) - 1].text_color}`,
                    }}
                  >
                    {categories[Number(id) - 1].title}
                  </h6>
                </Filter>
              ))
            : null}
        </SelectedTags>
        <span
          style={{
            height: "20px",
          }}
        >
          <svg
            onClick={() => {
              handleClick();
              fetchData();
            }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6004 7.45834L11.1671 12.8917C10.5254 13.5333 9.47539 13.5333 8.83372 12.8917L3.40039 7.45834"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </Container>

      {isClicked ? (
        <FiltersContainer>
          {categories.map((item) => (
            <Filter
              onClick={handleTagClick}
              key={item.id}
              id={item.id.toString()}
              style={{
                backgroundColor: `${item.background_color}`,
                border: selectedTags.includes(item.id)
                  ? "1px solid gray"
                  : "none",
              }}
            >
              <h6
                style={{
                  color: `${item.text_color}`,
                }}
              >
                {item.title}
              </h6>
            </Filter>
          ))}
        </FiltersContainer>
      ) : null}
    </main>
  );
}
