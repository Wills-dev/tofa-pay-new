import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-confirm-alert/src/react-confirm-alert.css";

import "./App.css";

import GlobalState from "./utils/GlobalState";
import AppState from "./utils/AppState";
import Home from "./pages/home";
import AboutUs from "./pages/about-us";
import Overview from "./pages/overview";
import Login from "./pages/login";
import CreateList from "./pages/create-list";
import AllList from "./pages/all-list";
import AllListTables from "./pages/all-list-tables";
import ListTableDetails from "./pages/list-table-details";
import Partner from "./pages/partner";
import ListDetails from "./pages/list-details";
import ListEditDetails from "./pages/list-edit-details";
import RegisterPartner from "./pages/register-partner";
import Users from "./pages/users";
import RegisterUser from "./pages/register-user";
import ForgotPassword from "./pages/forgot-password";
import ForgotPasswordOtp from "./pages/forgot-password-otp";
import ResetPassword from "./pages/reset-password";
import AllSchedule from "./pages/all-scheduled";
import ScheduleListTables from "./pages/scheduled-list-tables";
import ScheduledListTableDetails from "./pages/scheduled-list-table-details";
import ExportedSchedule from "./pages/exported-schedule";
import ExportedScheduleDetails from "./pages/exported-schedule-details";
import Settings from "./pages/settings";
import Dispute from "./pages/dispute";
import ErrorPage from "./pages/error-page";
import NoInternetPage from "./pages/no-internet-page";
import UnauthorizedPage from "./pages/unauthorized-page";
import { Sidebar } from "./shared-components/Sidebar";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalState>
        <AppState>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />

            <Route
              path="/overview"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <Overview />
                </div>
              }
            />
            <Route
              path="/create-list"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <CreateList />{" "}
                </div>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/login/:userId" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/forgot-password/otp"
              element={<ForgotPasswordOtp />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/lists"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <AllList />{" "}
                </div>
              }
            />
            <Route
              path="/all-list-tables"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <AllListTables />
                </div>
              }
            />
            <Route
              path="/all-list-tables/details/:tableId"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <ListTableDetails />
                </div>
              }
            />
            <Route
              path="/lists/details/:id"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <ListDetails />
                </div>
              }
            />
            <Route
              path="/lists/edit/:id"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <ListEditDetails />{" "}
                </div>
              }
            />
            <Route
              path="/all-scheduled"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <AllSchedule />{" "}
                </div>
              }
            />
            <Route
              path="/all-schedule-tables"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <ScheduleListTables />{" "}
                </div>
              }
            />
            <Route
              path="/exported-schedule"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <ExportedSchedule />
                </div>
              }
            />
            <Route
              path="/exported-schedule/details/:scheduleId"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <ExportedScheduleDetails />
                </div>
              }
            />
            <Route
              path="/all-schedule-tables/details/:tableId"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <ScheduledListTableDetails />
                </div>
              }
            />
            <Route
              path="/partners"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <Partner />
                </div>
              }
            />
            <Route path="/register/partner" element={<RegisterPartner />} />
            <Route
              path="/users"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <Users />
                </div>
              }
            />
            <Route path="/register/user" element={<RegisterUser />} />
            <Route
              path="/profile"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <Settings />{" "}
                </div>
              }
            />
            <Route
              path="/dispute"
              element={
                <div className="flex relative ">
                  <Sidebar />
                  <Dispute />
                </div>
              }
            />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/no-connection" element={<NoInternetPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </AppState>
      </GlobalState>
    </QueryClientProvider>
  );
}

export default App;
