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
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileChange = (event) => {
    event.persist();
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

  const handleFileSubmit = async (file, name) => {
    const token = localStorage.getItem("token");

    if (file && name) {
      try {
        await uploadProfileImage(file, name, token);
        alert("Profile image uploaded!");
        resetForm();
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Upload failed.");
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
