import Button from "../components/Button";

const Home = () => {
  return (
    <div>
      <h1>Dice&Dine</h1>
      <p>Welcome to the homepage.</p>
      <Button onClick={() => alert("Button clicked!")}>Start</Button>
    </div>
  );
};

export default Home;
