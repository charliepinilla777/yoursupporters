import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { useAuth } from "./contexts/AuthContext"
import AppHeader from "./components/AppHeader"
import BottomTabs from "./components/BottomTabs"
import LanguageSwitcher from "./components/LanguageSwitcher"

import Landing from "./pages/Landing"
import Explore from "./pages/Explore"
import CreatorProfile from "./pages/CreatorProfile"
import Chat from "./pages/Chat"
import CreatorDashboard from "./pages/CreatorDashboard"

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" replace />} />
      <Route path="/creator/:id" element={<CreatorProfile />} />
      <Route path="/dashboard" element={user ? <CreatorDashboard /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-shell">
          <AppHeader title="Super Hot" />
          <main className="main-content">
            <AppRoutes />
          </main>
          <BottomTabs />
          <LanguageSwitcher />
        </div>
      </Router>
    </AuthProvider>
  );
}
