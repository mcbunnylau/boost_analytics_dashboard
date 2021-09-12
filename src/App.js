import "./App.css";
import data from "./Query";

const App = () => {
  return (
    <div>
      {data.map((block) => {
        return (
          <div>
            Block: {block[0]} ---> Balance: {block[1]}
          </div>
        );
      })}
    </div>
  );
};

export default App;
