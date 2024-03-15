import styled from "styled-components";
import { useState } from "react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  input {
    width: 288px;
    box-sizing: border-box;
    height: 44px;
    border-radius: 12px;
    outline: none;
    border: 1px solid #e4e3eb;
    padding: 0 10px;
  }
  input:focus {
    border: 1.5px solid #5d37f3;
  }
`;

export const Label = styled.label`
  font-family: FiraGO;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;
export const UnorderedList = styled.ul`
  padding: 0 20px;

  li {
    font-family: FiraGO;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #85858d;
  }
`;

export default function Author({
  onValidityChange,
}: {
  onValidityChange: (isValid: boolean) => void;
}) {
  const [author, setAuthor] = useState<string>("");

  const handleAuthorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAuthor = e.target.value;
    setAuthor(inputAuthor);
    const isValid =
      e.target.style.border === "1px solid lightgreen" ? true : false;
    onValidityChange(isValid);
  };

  return (
    <Container>
      <Label htmlFor="author">ავტორი *</Label>
      <input
        id="author"
        value={author}
        onChange={handleAuthorInput}
        type="text"
        placeholder="შეიყვნეთ ავტორი"
        minLength={4}
        required
        style={{
          border:
            author?.trim().length >= 4 &&
            author.trim().split(" ").length >= 2 &&
            author.match(/^[ა-ჰ\s]+$/) != null
              ? "1px solid lightgreen"
              : author?.trim().length == 0
              ? undefined
              : "1px solid red",
        }}
      />
      <UnorderedList>
        <li
          style={{
            color:
              (author?.length > 0 && author.length < 4) ||
              (author.trim().length == 0 && author.length > 0)
                ? "red"
                : author?.trim().length >= 4
                ? "lightgreen"
                : "#85858d",
          }}
        >
          მინიმუმ 4 სიმბოლო
        </li>
        <li
          style={{
            color:
              author.trim().split(" ").length < 2 && author.length > 0
                ? "red"
                : author.trim().split(" ").length >= 2
                ? "lightgreen"
                : "#85858d",
          }}
        >
          მინიმუმ ორი სიტყვა
        </li>
        <li
          style={{
            color:
              author.match(/^[ა-ჰ\s]+$/) == null && author.length > 0
                ? "red"
                : author.match(/^[ა-ჰ\s]+$/) != null
                ? "lightgreen"
                : "#85858d",
          }}
        >
          მხოლოდ ქართული სიმბოლოები
        </li>
      </UnorderedList>
    </Container>
  );
}
