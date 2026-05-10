import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useHydrateMe } from "./domain/user/user.usecase";
import NotFound from "./pages/NotFound";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user, isFetching } = useHydrateMe();

  if (isFetching) {
    return <div>Calling me endpoint.... Testing</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user, isFetching } = useHydrateMe();

  if (isFetching) {
    return <div>Calling me endpoint.... Testing</div>;
  }

  if (user) {
    <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <PublicRoutes>
          <LoginPage />
        </PublicRoutes>
      }
    />
    <Route
      path="/register"
      element={
        <PublicRoutes>
          <RegisterPage />
        </PublicRoutes>
      }
    />
    <Route
      path="/"
      element={
        <ProtectedRoutes>
          <AppRoutes />
        </ProtectedRoutes>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
