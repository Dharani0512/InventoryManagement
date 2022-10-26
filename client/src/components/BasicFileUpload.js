import axios from "axios";
import React, { useState } from "react";
import { useAppcontext } from "../context/appContext";

function BasicFileUpload() {
  const { fileUpload, imageSrc } = useAppcontext();
  const [selectedFile, setSelectedFile] = useState();

  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);

    setIsFilePicked(true);
    fileUpload("leaveDetails", selectedFile);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const state = {};
    fileUpload("leaveDetails", selectedFile);
  };
  console.log(imageSrc);
  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />

      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>

          <p>Filetype: {selectedFile.type}</p>

          <p>Size in bytes: {selectedFile.size}</p>

          {/* <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p> */}
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}

      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}

export default BasicFileUpload;
