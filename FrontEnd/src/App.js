import AuthForm from "./components/Signup/signup";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Admin from "./pages/Admin";
import AdminPosts from "./pages/AdminPosts";
import AdminUsers from "./pages/AdminUsers";
import Artwork from "./pages/Artwork";
import GalleryPage from "./pages/GalleryPage";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Routes that include the Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/artwork" element={<Artwork />} />
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

/*--primary-color: #171717;
    --primary-color-opc: 23, 23, 23;
    --title-color: #171717;
    --title-color-opc: 23, 23, 23;
    --white-color: #fff;
    --text-color-white: #D3D3D3;
    --text-color: #595959;
    --text-color2: #545454;
    --text-color-opc: 89, 89, 89;
    --border-color: #EEEEEE;
    --border-color-opc: 230, 230, 230;*/

/*Background: #FFF5F5 (Rose White - soft and elegant)
Primary Accent: #C08B6F (Muted Rose - for buttons, highlights)
Secondary Accent: #8B5E3C (Wood Brown - for headers, footer, frames)
Text Color: #3D2B1F (Deep Brown - for readability)
Light Neutral: #F8EDE3 (Warm Beige - for contrast)
*/
