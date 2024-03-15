import { useState } from "react";
import Author from "./Author";
import Caption from "./Caption";
import Categories from "./Categories";
import Description from "./Description";
import EmailField from "./EmailField";
import FileUpload from "./FileUpload";
import PublishDate from "./PublishDate";
import { styled } from "styled-components";
import axios from "axios";
import SuccessfulAuth from "../DesktopPageComponents/SuccessfulAuth";
import { useNavigate } from "react-router-dom";

const AuthCaptionDiv = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PublishDateCategoriesDiv = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  flex-grow: 1;
`;

const SubmitButton = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 288px;
  height: 40px;
  padding: 10px 20px 10px 20px;
  border-radius: 8px;
  border: none;
  font-family: FiraGO;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
  background-color: #e4e3eb;
  cursor: pointer;
`;

const AddedSuccessfull = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: -webkit-fill-available;
  background-color: rgba(40, 40, 40, 0.6);
  h2 {
    color: white;
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

export default function Form() {
  const navigate = useNavigate();
  const [authorValid, setAuthorValid] = useState(false);
  const [captionValid, setCaptionValid] = useState(false);
  const [categoriesValid, setCategoriesValid] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [publishDateValid, setPublishDateValid] = useState(false);
  const [fileValid, setFileValid] = useState(false);
  const [fileValue, setFileValue] = useState<FileList | undefined>();
  const [ids, setIds] = useState<number[]>();
  const [responseStatus, setResponseStatus] = useState<number>();

  const handleAuthorValidityChange = (isValid: boolean) => {
    setAuthorValid(isValid);
  };
  const handleCaptionValidityChange = (isValid: boolean) => {
    setCaptionValid(isValid);
  };
  const handleCategoriesValidityChange = (isValid: boolean) => {
    setCategoriesValid(isValid);
  };
  const handleDescriptionValidityChange = (isValid: boolean) => {
    setDescriptionValid(isValid);
  };
  const handleEmailValidityChange = (isValid: boolean) => {
    setEmailValid(isValid);
  };
  const handlePublishDateValidityChange = (isValid: boolean) => {
    setPublishDateValid(isValid);
  };
  const handleFileValidityChange = (isValid: boolean) => {
    setFileValid(isValid);
  };

  const handleFilesValue = (files: FileList) => {
    setFileValue(files);
  };
  const handleIds = (tag: number[]) => {
    setIds(tag);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authorInput =
      event.currentTarget.querySelector<HTMLInputElement>("#author");
    const titleInput =
      event.currentTarget.querySelector<HTMLInputElement>("#caption");
    const descriptionInput =
      event.currentTarget.querySelector<HTMLInputElement>("#description");
    const publishDateInput =
      event.currentTarget.querySelector<HTMLInputElement>("#publish_date");
    const emailInput =
      event.currentTarget.querySelector<HTMLInputElement>("#email");

    const formData = new FormData();

    if (fileValue) {
      formData.append("image", fileValue[0]);
    }
    if (authorInput) {
      formData.append("author", authorInput.value);
    }
    if (titleInput) {
      formData.append("title", titleInput.value);
    }
    if (descriptionInput) {
      formData.append("description", descriptionInput.value);
    }
    if (publishDateInput) {
      formData.append("publish_date", publishDateInput.value);
    }
    if (emailInput) {
      formData.append("email", emailInput.value);
    }

    formData.append("categories", JSON.stringify(ids));

    axios
      .post("https://api.blog.redberryinternship.ge/api/blogs", formData, {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer 81f6285e53362cd90d08045eb5da8b78d96d0a836bd9d04cd7c78950b8dfdce3",
        },
      })
      .then((res) => {
        setResponseStatus(res.status);
      })
      .catch((err) =>
        alert(err + "\n" + "Please change selected Picture it is more then 2mb")
      );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FileUpload
          onValidityChange={handleFileValidityChange}
          filesValue={handleFilesValue}
        />

        <AuthCaptionDiv>
          <InputWrapper>
            <Author onValidityChange={handleAuthorValidityChange} />
          </InputWrapper>
          <InputWrapper>
            <Caption onValidityChange={handleCaptionValidityChange} />
          </InputWrapper>
        </AuthCaptionDiv>
        <Description onValidityChange={handleDescriptionValidityChange} />
        <PublishDateCategoriesDiv>
          <InputWrapper>
            <PublishDate onValidityChange={handlePublishDateValidityChange} />
          </InputWrapper>
          <InputWrapper>
            <Categories
              onValidityChange={handleCategoriesValidityChange}
              selectedIds={handleIds}
            />
          </InputWrapper>
        </PublishDateCategoriesDiv>
        <EmailField onValidityChange={handleEmailValidityChange} />
        {responseStatus === 204 ? (
          <AddedSuccessfull>
            <SuccessfulAuth
              onClick={() => navigate("/")}
              text="ჩანაწერი წარმატებით დაემატა"
              buttonText="მთავარ გვერდზე დაბრუნება"
            />
          </AddedSuccessfull>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "20px",
            }}
          >
            <SubmitButton
              type="submit"
              style={{
                backgroundColor:
                  fileValid &&
                  authorValid &&
                  captionValid &&
                  descriptionValid &&
                  publishDateValid &&
                  categoriesValid &&
                  emailValid
                    ? "#4721DD"
                    : undefined,
              }}
            />
          </div>
        )}
      </form>
    </>
  );
}
