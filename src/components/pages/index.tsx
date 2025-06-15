import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderOne from "../ui/loader-one";
import { NotFoundPage } from "../ui/404-page-not-found";

// Lazy-loaded components
const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./login-2"));
const Signup = lazy(() => import("./signup"));

// Optional: Create a protected route component
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const user = useAuth(); // Your auth hook
//   return user ? children : <Navigate to="/login" />;
// };

function Pages() {
  return (
    <Suspense fallback={<LoaderOne />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Example of a protected route */}
        {/* <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        /> */}
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default Pages;