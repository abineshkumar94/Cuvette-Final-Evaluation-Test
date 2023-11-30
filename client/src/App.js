import "./App.css";
import Home from "./Components/Home";
import Bookmarkpage from "./Components/Bookmarkpage";

import IndividualStory from "./Components/IndividualStory";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookmark/:id" element={<Bookmarkpage />} />
      <Route path="/individualstory/:id" element={<IndividualStory />} />
    </Routes>
  );
};

export default App;
