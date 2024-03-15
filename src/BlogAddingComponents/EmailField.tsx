import { useState } from "react";
import { Container, Label } from "./Caption";
import { styled } from "styled-components";

const EmailContainer = styled(Container)`
  margin-top: 1rem;
  input {
    box-sizing: border-box;
    max-width: 288px;
    outline: none;
  }
  input:focus {
    border: 1.5px solid #5d37f3;
  }
  p {
    font-family: FiraGO;
    margin-top: 6px;
    margin-bottom: 0;
    color: red;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin-left: 5px;
  }
  span {
    display: flex;
    align-items: center;
  }
`;
export default function EmailField({
  onValidityChange,
}: {
  onValidityChange: (isValid: boolean) => void;
}) {
  const [email, setEmail] = useState<string>("");
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const isValid = /[\w-\.]+@redberry\.ge$/.test(newEmail);
    onValidityChange(isValid);
  };

  return (
    <>
      <EmailContainer>
        <Label htmlFor="Email">ელ-ფოსტა</Label>
        <input
          id="email"
          type="email"
          placeholder="Example@redbery.ge"
          required
          value={email}
          onChange={handleEmailInput}
          style={{
            border:
              !/[\w-\.]+@redberry\.ge$/.test(email) && email.length > 0
                ? "1px solid red"
                : /[\w-\.]+@redberry\.ge$/.test(email) &&
                  email.includes("redberry.ge")
                ? "1px solid lightgreen"
                : "1px solid #e4e3eb",
          }}
        />
        <span
          style={{
            display:
              !/[\w-\.]+@redberry\.ge$/.test(email) &&
              email.length > 0 &&
              !email.includes("redberry.ge")
                ? "flex"
                : /[\w-\.]+@redberry\.ge$/.test(email) &&
                  email.includes("redberry.ge")
                ? "none"
                : "none",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99967 1.66665C5.41634 1.66665 1.66634 5.41665 1.66634 9.99998C1.66634 14.5833 5.41634 18.3333 9.99967 18.3333C14.583 18.3333 18.333 14.5833 18.333 9.99998C18.333 5.41665 14.583 1.66665 9.99967 1.66665Z"
              fill="#EA1919"
            />
            <path
              d="M10 13.3333L10 9.16665"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.0049 6.66669L9.9974 6.66669"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p>მეილი უნდა მთავრდებოდეს @redberry.ge-ით</p>
        </span>
      </EmailContainer>
    </>
  );
}
