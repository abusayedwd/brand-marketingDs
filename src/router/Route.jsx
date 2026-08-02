import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../home/Home";
import ForgotPassword from "../auth/ForgotPassword";
import VerifyOtp from "../auth/VerifyOtp";
import UpdatePassword from "../auth/UpdatePassword";
import Main from "../layout/Main";
import DashboardHome from "../dashboard/home/DashboardHome";
import Notification from "../dashboard/menu/headermenu/Notification";
import Profile from "../dashboard/menu/headermenu/Profile";
import EditProfiel from "../dashboard/menu/headermenu/EditProfile";
import PrivacyPolicy from "../dashboard/menu/privacypolicy/PrivacyPolicy";
import EditPrivacy from "../dashboard/menu/privacypolicy/EditPrivacy";
import TermCondition from "../dashboard/menu/termsCondition/TermCondition";
import EditTermCondition from "../dashboard/menu/termsCondition/EditTermCondition";
import ErrorPage from "./ErrorPage";
import About from "../dashboard/menu/about/About";
import EditAbout from "../dashboard/menu/about/EditAbout";
import WithdrawRequest from "../dashboard/menu/subscription/WithdrawRequest";
import Addsubscripton from "../dashboard/menu/subscription/Addsubscripton";
import Editsubscription from "../dashboard/menu/subscription/Editsubscription";
import PlansPage from "../dashboard/menu/subscription/PlansPage";
import Settings from "../dashboard/menu/sidebarMenu/Settings";
import AdminsPage from "../dashboard/menu/sidebarMenu/Brand";
import InfluencerListPage from "../dashboard/menu/sidebarMenu/User";
import CampaignListPage from "../dashboard/menu/sidebarMenu/CampaignList";
import SupportTickets from "../dashboard/menu/sidebarMenu/SupportTickets";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "verifyotp",
    element: <VerifyOtp />,
  },
  {
    path: "updatepassword",
    element: <UpdatePassword />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <DashboardHome /> },
      { path: "notification", element: <Notification /> },
      { path: "profile", element: <Profile /> },
      { path: "editprofile", element: <EditProfiel /> },
      { path: "brand", element: <AdminsPage /> },
      { path: "content-creator", element: <InfluencerListPage /> },
      { path: "campaigns", element: <CampaignListPage /> },
      { path: "settings", element: <Settings /> },
      { path: "settings/privacypolicy", element: <PrivacyPolicy /> },
      { path: "settings/editprivacypolicy", element: <EditPrivacy /> },
      { path: "settings/termcondition", element: <TermCondition /> },
      { path: "settings/edittermcondition", element: <EditTermCondition /> },
      { path: "settings/about", element: <About /> },
      { path: "settings/editabout", element: <EditAbout /> },
      { path: "withdraw-request", element: <WithdrawRequest /> },
      { path: "support", element: <SupportTickets /> },
      { path: "plans", element: <PlansPage /> },
      { path: "subscription/addsubscription", element: <Addsubscripton /> },
      { path: "subscription/editsubscription", element: <Editsubscription /> },
    ],
  },
]);
