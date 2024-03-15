import React, { useState } from "react";

import { styled } from "styled-components";
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
export default function Caption({
  onValidityChange,
}: {
  onValidityChange: (isValid: boolean) => void;
}) {
  const [caption, setCaption] = useState<string>("");
  const handleCaptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
    const isValid =
      e.target.style.border === "1px solid lightgreen" ? true : false;
    onValidityChange(isValid);
  };

  return (
    <Container>
      <Label htmlFor="caption">სათური *</Label>
      <input
        id="caption"
        value={caption}
        onChange={handleCaptionInput}
        type="text"
        placeholder="შეიყვნეთ სათაური"
        style={{
          width: "288px",
          boxSizing: "border-box",
          border:
            caption.trim().length >= 2
              ? "1px solid lightgreen"
              : caption.trim().length >= 1 && caption.trim().length <= 2
              ? "1px solid red"
              : undefined,
        }}
        minLength={2}
        required
      />
      <UnorderedList>
        <li
          style={{
            color:
              (caption?.length > 0 && caption.length < 2) ||
              (caption.trim().length == 0 && caption.length > 0)
                ? "red"
                : caption?.trim().length >= 2
                ? "lightgreen"
                : "#85858d",
          }}
        >
          მინიმუმ 2 სიმბოლო
        </li>
      </UnorderedList>
    </Container>
  );
}
