import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import Index from './Components/Portfolio/Index.jsx'
import LoginForm from "./Components/Form/Login.jsx";
import Profile from "./Components/Form/Profile.jsx";
import WorkExperienceForm from "./Components/Form/Experience.jsx";
import EducationForm from "./Components/Form/Education.jsx";
import Project from "./Components/Form/Project.jsx";
import Certificate from "./Components/Form/Certificate.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/adddata" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/experience" element={<WorkExperienceForm />} />
          <Route path="/education" element={<EducationForm />} />
          <Route path="/project" element={<Project />} />
          <Route path="/certificate" element={<Certificate />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;