import styled from "styled-components";
import { UnorderedList, Label } from "./Caption";
import { useState } from "react";
const Container = styled.div`
  display: flex;
  flex-direction: column;

  textarea {
    height: 124px;
    border-radius: 12px;
    border: 1px solid #e4e3eb;
    padding: 10px;
    outline: none;
  }
  textarea:focus {
    border: 1.5px solid #5d37f3;
  }
`;
export default function Description({
  onValidityChange,
}: {
  onValidityChange: (isValid: boolean) => void;
}) {
  const [description, setDescription] = useState<string>("");
  const handleDescriptionInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    const isValid =
      e.target.style.border === "1px solid lightgreen" ? true : false;
    onValidityChange(isValid);
  };

  return (
    <Container>
      <Label htmlFor="description">აღწერა *</Label>
      <textarea
        name="description"
        id="description"
        rows={5}
        cols={33}
        minLength={4}
        value={description}
        onChange={handleDescriptionInput}
        style={{
          border:
            description.length >= 4
              ? "1px solid lightgreen"
              : description.length >= 1 && description.length <= 4
              ? "1px solid red"
              : undefined,
        }}
      />

      <UnorderedList>
        <li
          style={{
            color:
              (description?.length > 0 && description.length < 4) ||
              (description.trim().length == 0 && description.length > 0)
                ? "red"
                : description?.trim().length >= 4
                ? "lightgreen"
                : "#85858d",
          }}
        >
          მინიმუმ 4 სიმბოლო
        </li>
      </UnorderedList>
    </Container>
  );
}
