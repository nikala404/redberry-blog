import styled from "styled-components";
import folderAddPng from "../assets/folder-add.png";
import gallery from "../assets/gallery.png";
import { ChangeEvent, useState } from "react";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  h6 {
    font-family: FiraGO;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0.2rem;
  }
`;
const FileUploader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 11.25rem;
  border: 1px dashed #85858d;

  border-radius: 10px;

  input[type="file"] {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 0.75rem;
    opacity: 0;
    position: absolute;
  }

  img {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 50%);
    max-width: 33.33px;
    max-height: 33.93px;
  }

  span {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
  }

  span h6 {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const FileUploaded = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "FiraGO", sans-serif;
  margin: 10px 0;
`;
interface FileUploadProps {
  onValidityChange: (isValid: boolean) => void;
  filesValue: (files: FileList) => void;
}

export default function FileUpload({
  onValidityChange,
  filesValue,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files);
      onValidityChange(true);
      filesValue(files);
    } else {
      setSelectedFile(null);
      onValidityChange(false);
    }
  };

  const handleFileDiscard = () => {
    setSelectedFile(null);
    onValidityChange(false);
  };

  const CloseIcon = () => (
    <svg
      onClick={handleFileDiscard}
      style={{
        cursor: "pointer",
      }}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75781 16.2426L16.2431 7.75736"
        stroke="#1A1A1F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2431 16.2426L7.75781 7.75736"
        stroke="#1A1A1F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <Container>
      <h6>ატვირთეთ ფოტო</h6>
      {selectedFile ? (
        <>
          <FileUploaded>
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={gallery} alt="" />
              <span
                style={{
                  marginLeft: "10px",
                }}
              >
                {selectedFile[0].name}
              </span>
            </span>
            <span>
              <CloseIcon />
            </span>
          </FileUploaded>
        </>
      ) : (
        <FileUploader>
          <></>
          <img src={folderAddPng} alt="" />
          <input
            id="file"
            type="file"
            onChange={handleFileInputChange}
            required
          />
          <span>
            ჩააგდეთ ფაილი აქ ან
            <h6>აირჩიეთ ფაილი</h6>
          </span>
        </FileUploader>
      )}
    </Container>
  );
}
