import { Route, Routes } from "react-router-dom";
import CreateFlashcardPage from "./components/CreateFlashcardPage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Flashcards from "./components/Flashcards";
import FlashcardInfo from "./components/FlashcardInfo";

function App() {
  return (
    <div className="w-full min-h-screen bg-stone-400 ">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/createflashcard" element={<CreateFlashcardPage />} />
        <Route path="/flashcards" element={<Flashcards/>}/>
        <Route path="/flashcardinfo/:groupId" element={<FlashcardInfo/>}/>
      </Routes>
    </div>
  );
}

export default App;
