import {useState} from "react";
import {useUser} from "./userHooks";

const useForm = (callback, initState) => {
  const [inputs, setInputs] = useState(initState);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const {uploadProfileImage} = useUser();

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const success = callback(inputs);
    return success;
  };

  const handleInputChange = (language, event) => {
    const {name, value} = event.target;

    if (language) {
      setInputs((inputs) => ({
        ...inputs,
        [language]: {
          ...inputs[language],
          [name]: value,
        },
      }));
    } else {
      setInputs((inputs) => ({
        ...inputs,
        [name]: value,
      }));
    }
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
    setInputs({});
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
  };
};

export default useForm;
