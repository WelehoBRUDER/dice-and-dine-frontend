import {useState} from "react";

const useForm = (callback, initState) => {
  const [inputs, setInputs] = useState(initState);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

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

    if (selectedFile) {
      setFile(selectedFile);
      setInputs((inputs) => ({
        ...inputs,
        [event.target.name]: selectedFile,
      }));
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const resetForm = () => {
    setInputs({});
    setFilePreview(null);
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    handleFileChange,
    filePreview,
    resetForm,
  };
};

export default useForm;
