/**
 * @file formHooks.js
 * @description Custom hook for managing form state and submission.
 * This hook provides functionality for handling input changes, file uploads, and form submission.
 * It also includes a reset function to clear the form state.
 * @param {function} callback - The function to be called on form submission.
 * @param {object} initState - The initial state of the form inputs.
 * @property {function} handleSubmit - Function to handle form submission.
 * @property {function} handleInputChange - Function to handle input changes for text fields.
 * @property {function} handleInputChangeMenu - Function to handle input changes for menu items.
 * @property {function} handleFileChange - Function to handle file input changes.
 * @property {function} handleFileSubmit - Function to handle file submission.
 * @property {function} resetForm - Function to reset the form state.
 * @property {object} inputs - The current state of the form inputs.
 * @property {object} file - The selected file for upload.
 * @property {string} filePreview - The preview URL of the selected file.
 * @property {function} setFile - Function to set the selected file.
 * @property {function} setFilePreview - Function to set the preview URL of the selected file.
 * @property {function} setInputs - Function to set the form inputs state.

 */

import {useState} from "react";
import {useUser} from "./userHooks";

const useForm = (callback, initState) => {
  const [inputs, setInputs] = useState(() => ({...initState}));
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const {uploadProfileImage} = useUser();

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const success = await callback(inputs);
    return success;
  };

  const handleInputChange = (event) => {
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleInputChangeMenu = (language, event) => {
    const {name, value} = event.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [language]: {
        ...prevInputs[language],
        [name]: value, // dynamically updating the language-specific field
      },
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.size < 5 * 1024 * 1024) {
      setFile(selectedFile);
      setInputs((inputs) => ({
        ...inputs,
        [event.target.name]: selectedFile,
      }));
      setFilePreview(URL.createObjectURL(selectedFile));
    } else {
      alert("File is too large. Please upload a file smaller than 5MB.");
    }
  };

  const resetForm = () => {
    setInputs(() => initState);
    setFilePreview(null);
  };

  const handleFileSubmit = async (file, name, successAlert, errorAlert) => {
    const token = localStorage.getItem("token");

    if (file && name) {
      try {
        const result = await uploadProfileImage(file, name, token);
        alert(successAlert);
        resetForm();
        return result.file.filename;
      } catch (err) {
        console.error("Upload failed:", err);
        alert(errorAlert);
      }
    } else {
      console.error("Missing file or username");
    }
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    handleFileChange,
    file,
    filePreview,
    handleFileSubmit,
    resetForm,
    handleInputChangeMenu,
  };
};

export default useForm;
