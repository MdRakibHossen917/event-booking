import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import CreateGroup from "../pages/CreateGroup/CreateGroup";
import MyGroup from "../pages/MyGroup/MyGroup";
import AllGroups from "../pages/AllGroups/AllGroups";
import AboutUs from "../pages/AboutUs/AboutUs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UpdateGroup from "../pages/MyGroup/UpdateGroup";
import PrivateRoute from "../routes/PrivateRoutes";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../Dashboard/DashboardHome";
import JoinedGroups from "../Dashboard/JoinedGroups";
import MyCreatedGroups from "../Dashboard/MyCreatedGroups";
import MyEvents from "../Dashboard/MyEvents";
import Profile from "../Dashboard/Profile";
import CreateArticle from "../Dashboard/CreateArticle";
import MyArticles from "../Dashboard/MyArticles";
import Articles from "../pages/Articles/Articles";
import ArticleDetails from "../pages/Articles/ArticleDetails";
import GroupDetails from "../pages/AllGroups/GroupDetails";
import ComingSoon from "../shared/ComingSoon";
import Error from "../pages/Error/Error";
import Contact from "../pages/Contact/Contact";
import BlogPage from "../pages/BlogPage/BlogPage";
import EventOrganisers from "../shared/EventOrganisers";
import VolunteerOpportunities from "../shared/VolunteerOpportunities";
 
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "/createGroup",
        element: (
          <PrivateRoute>
            <CreateGroup />
          </PrivateRoute>
        ),
      },
      {
        path: "/myGroup",
        element: (
          <PrivateRoute>
            <MyGroup />
          </PrivateRoute>
        ),
      },

      {
        path: "/group/:id",
        element: (
          <PrivateRoute>
            <GroupDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/updateGroup/:id",
        element: (
          <PrivateRoute>
            <UpdateGroup />
          </PrivateRoute>
        ),
      },
      {
        path: "/allGroups",
        element: <AllGroups />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/articles/:id",
        element: <ArticleDetails />,
      },
      {
        path: "/come",
        element: <ComingSoon />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/VolunteerOpp",
        element: <VolunteerOpportunities />,
      },
      {
        path: "/eventOrg",
        element: <EventOrganisers />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "home",
        element: <DashboardHome />,
      },
      {
        path: "myCreatedGroups",
        element: <MyEvents />,
      },
      {
        path: "joined-groups",
        element: <MyEvents />,
      },
      {
        path: "myEvents",
        element: <MyEvents />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "create-article",
        element: <CreateArticle />,
      },
      {
        path: "my-articles",
        element: <MyArticles />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
export default router;
