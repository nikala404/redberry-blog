import { styled } from "styled-components";
import React from "react";
const Filter = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 17px 10px;
  border-radius: 15px;
  height: 15px;
  cursor: pointer;
  h6:hover {
    border: none;
  }
  &:hover {
    transform: translateY(-2px);
    text-shadow: 1px;
  }
`;

interface FilterProps {
  filter: {
    id?: number;
    background_color?: string;
    text_color?: string;
    title?: string;
  };

  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  id?: string;
  selectedFilterId?: number[] | undefined;
  currentFilterId?: number | undefined;
}

export default function Filters({
  filter,
  onClick,
  id,
  selectedFilterId,
}: FilterProps) {
  if (!filter) {
    return null;
  }

  if (
    !filter.background_color ||
    !filter.text_color ||
    !filter.title ||
    !filter.id
  ) {
    return null;
  }

  return (
    <Filter
      id={id}
      onClick={onClick}
      key={filter.id}
      style={{
        backgroundColor: `${filter.background_color}`,
        border: selectedFilterId?.includes(filter.id)
          ? "1.5px solid black"
          : "none",
      }}
    >
      <h6
        id={id}
        style={{
          color: `${filter.text_color}`,
          fontSize: "13px",
        }}
      >
        {filter.title}
      </h6>
    </Filter>
  );
}
