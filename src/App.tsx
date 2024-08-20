import { useState } from "react";
import Todo from "./components/Todo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-stone-900 grid py-4 min-h-screen">
        <Todo />
      </div>
    </>
  );
}

export default App;
