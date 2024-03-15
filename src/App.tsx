import DesktopPage from "./pages/DesktopPage";
import BlogAddingForm from "./pages/BlogAddingForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Blog from "./pages/Blog";

type UserInfo = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserInfo | null>(null);
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            isLoggedIn: isLoggedIn,
            setIsLoggedIn,
          }}
        >
          <Routes>
            <Route path="/" element={<DesktopPage />} />
            <Route path="/blog_form" element={<BlogAddingForm />} />
            <Route path="/blog/:id" element={<Blog />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
