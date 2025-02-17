import { Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute.jsx";
import AddGames from "./core/private/add_games.jsx";
import AdminProfilePage from "./core/private/admin_profile.jsx";
import AdminDashboardPage from "./core/private/admindashboard.jsx";
import Shuffle from "./core/private/shuffle.jsx";
import ChatPage from "./core/public/chatpage.jsx";
import DashboardPage from "./core/public/dashboard.jsx";
import ForgetPassword from "./core/public/forgetPassword.jsx";
import TournamentCreationPage from "./core/public/game_creation.jsx";
import GameRegistrationPage from "./core/public/game_registration.jsx";
import GetStarted from "./core/public/gettingstarted.jsx";
import HistoryPage from "./core/public/history.jsx";
import LoginPage from "./core/public/login.jsx";
import MatchmakingPage from "./core/public/matchmaking.jsx";
import ProfilePage from "./core/public/profile.jsx";
import ResetPasswordPage from "./core/public/resetPassword.jsx";
import SignupPage from "./core/public/signup.jsx";
import WelcomePage from "./core/public/welcomepage.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage for token and role
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setIsAuthenticated(true);
      setIsAdmin(role === "admin");
    }
  }, []);

  // Public Routes (Always accessible)
  const publicRoutes = [
    { path: "/", element: <GetStarted /> },
    { path: "/welcomepage", element: <WelcomePage /> },
    { path: "/login", element: <LoginPage setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} /> },
    { path: "/register", element: <SignupPage /> },
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/forgetPassword", element: <ForgetPassword /> },
    { path: "/resetPassword", element: <ResetPasswordPage /> },
    { path: "/chat", element: <ChatPage /> },
    { path: "/gamecreate", element: <TournamentCreationPage /> },
    { path: "/gameregistrate", element: <GameRegistrationPage /> },
    { path: "/history", element: <HistoryPage /> },
    { path: "/matchmaking", element: <MatchmakingPage /> },
    { path: "/tournaments/:gameName", element: <GameRegistrationPage /> },
    { path: "*", element: <>Page not found</> },
  ];

  // Private/Admin Routes (Require authentication and admin role)
  const privateRoutes = [
    {
      path: "/admindash",
      element: (
        <ProtectedRoute isAdminRoute={true} isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
          <AdminDashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/addgames",
      element: (
        <ProtectedRoute isAdminRoute={true} isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
          <AddGames />
        </ProtectedRoute>
      ),
    },
    {
      path: "/adminprofile",
      element: (
        <ProtectedRoute isAdminRoute={true} isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
          <AdminProfilePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/shuffle",
      element: (
        <ProtectedRoute isAdminRoute={true} isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
          <Shuffle />
        </ProtectedRoute>
      ),
    },
  ];

  // Combine all routes
  const routes = [...publicRoutes, ...privateRoutes];

  // Router
  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;