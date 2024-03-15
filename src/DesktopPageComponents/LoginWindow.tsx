import styled from "styled-components";
import SuccessfulAuth from "./SuccessfulAuth";

const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(34, 34, 34, 0.4);
  width: 100%;
  height: 100vh;
  position: fixed;
`;

const WindowClose = styled.div`
  display: flex;
  justify-content: flex-end;
  svg {
    cursor: pointer;
  }
`;

export const LoginWindowStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 480px;
  height: 272px;
  border-radius: 12px;
  background: white;
  padding: 0 1rem;
  h1 {
    text-align: center;
  }
  label {
    font-family: "FiraGO", sans-serif;
    font-size: 17px;
    font-weight: bold;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  input {
    height: 3em;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    outline: none;
  }
  input:focus {
    border: 2px solid #5d37f3;
  }

  button {
    padding: 12px 20px 12px 20px;
    border: none;
    border-radius: 8px;
    background: #5d37f3;
    color: white;
    cursor: pointer;
  }
`;

const Error = styled.span`
  font-family: FiraGO;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;
const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: #ea1919;
  gap: 0.5rem;
  margin-top: 5px;
`;

interface LoginProps {
  value: undefined | string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClickSvg: React.MouseEventHandler<SVGSVGElement>;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  responseStatus: number | undefined;
  successfulAuth: React.MouseEventHandler<HTMLButtonElement>;
}

export default function LoginWindow({
  value,
  onChange,
  onClickSvg,
  onClickButton,
  responseStatus,
  successfulAuth,
}: LoginProps) {
  const isError =
    (responseStatus && responseStatus < 200) ||
    (responseStatus && responseStatus > 300);
  return (
    <Container>
      <LoginWindowStyle>
        <WindowClose>
          <svg
            onClick={onClickSvg}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.75732 16.2426L16.2426 7.75736"
              stroke="#1A1A1F"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.2426 16.2426L7.75732 7.75736"
              stroke="#1A1A1F"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </WindowClose>
        {responseStatus &&
        responseStatus >= 200 &&
        responseStatus &&
        responseStatus < 300 ? (
          <>
            <SuccessfulAuth
              onClick={successfulAuth}
              text="წარმატებული ავტორიზაცია"
              buttonText="კარგი"
            />
          </>
        ) : (
          <>
            {" "}
            <h1>შესვლა</h1>{" "}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <label htmlFor="email">ელ-ფოსტა</label>{" "}
              <input
                type="email"
                placeholder="Example@redberry.ge"
                required
                onChange={onChange}
                value={value}
                style={{
                  border:
                    responseStatus &&
                    responseStatus > 200 &&
                    responseStatus < 300
                      ? "2px solid lightgreen"
                      : isError
                      ? "2px solid red"
                      : "1px solid black",
                }}
              />{" "}
              {isError ? (
                <ErrorMessage>
                  {" "}
                  <span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.00016 0.666663C4.41683 0.666663 0.666829 4.41666 0.666829 9C0.66683 13.5833 4.41683 17.3333 9.00016 17.3333C13.5835 17.3333 17.3335 13.5833 17.3335 9C17.3335 4.41666 13.5835 0.666663 9.00016 0.666663Z"
                        fill="#EA1919"
                      />
                    </svg>
                  </span>{" "}
                  <Error> ელ-ფოსტა არ მოიძებნა </Error>{" "}
                </ErrorMessage>
              ) : null}{" "}
            </div>{" "}
            <button onClick={onClickButton}>შესვლა</button>{" "}
          </>
        )}
      </LoginWindowStyle>
    </Container>
  );
}
