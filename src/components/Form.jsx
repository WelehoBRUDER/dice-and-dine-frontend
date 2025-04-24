import Input from "./Input";
import Button from "./Button";

const Form = ({type}) => {
  return (
    <form>
      <h1>{type}_page_title</h1>
      <Input
        name="username"
        text={`${type}_username_field`}
        type="text"
        placeholder="Enter your username"
      />
      <Input
        name="password"
        text={`${type}_password_field`}
        type="password"
        placeholder="Enter your password"
      />
      {type === "register" && (
        <Input
          name="email"
          text="email_field"
          type="text"
          placeholder="Enter your email"
        />
      )}
      <Button>submit_button</Button>
    </form>
  );
};

export default Form;
