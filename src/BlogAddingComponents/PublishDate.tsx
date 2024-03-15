import React, { useState } from "react";
import { Label, Container } from "./Author";

export default function PublishDate({
  onValidityChange,
}: {
  onValidityChange: (isValid: boolean) => void;
}) {
  const currentDate = new Date();
  const minDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1
  }-${
    currentDate.getDate() < 10
      ? "0" + currentDate.getDate()
      : currentDate.getDate()
  }`;
  const [date, setDate] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    setDate(inputDate);
    const isValidDate = !Number.isNaN(Date.parse(inputDate));
    setIsValid(isValidDate);
    onValidityChange(isValidDate);

    e.target.style.border = inputDate
      ? isValidDate
        ? "1px solid lightgreen"
        : "1px solid red"
      : "1px solid #e4e3eb";
  };

  return (
    <Container>
      <Label htmlFor="publish_date">გამოქვეყნების თარიღი *</Label>
      <input
        id="publish_date"
        required
        type="date"
        min={minDate}
        style={{
          width: "288px",
          boxSizing: "border-box",
          border: date
            ? isValid
              ? "1px solid lightgreen"
              : "1px solid red"
            : "1px solid #e4e3eb",
        }}
        value={date}
        onChange={handleDate}
      />
    </Container>
  );
}
