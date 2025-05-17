import AuthForm from "./components/Signup/signup";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Admin from "./pages/Admin";
import AdminPosts from "./pages/AdminPosts";
import AdminUsers from "./pages/AdminUsers";
import Artwork from "./pages/Artwork";
import ArtworkPostForm from "./pages/ArtworkPostForm";
import GalleryPage from "./pages/GalleryPage";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Profile from "./pages/Profile";
import ArtworkDashboard from "./components/ArtworkDashboard/ArtworkDashboard";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Routes that include the Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/artwork/:id" element={<Artwork />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artworkdashboard" element={<ArtworkDashboard />} />
        </Route>

        {/* Routes without Navbar (Login, Signup) */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<AuthForm />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<Admin />} /> {/* default: /admin */}
        <Route path="users" element={<AdminUsers />} /> {/* /admin/users */}
        <Route path="posts" element={<AdminPosts />} /> {/* /admin/posts */}
        </Route>
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
