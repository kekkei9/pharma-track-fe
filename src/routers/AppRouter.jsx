import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import RolePage from "../pages/RolePage/RolePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import BookApPage from "../pages/BookApPage/BookApPage";
import BookApPage2 from "../pages/BookApPage2/BookApPage2";
import BookApPage3 from "../pages/BookApPage3/BookApPage3";

import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import StaffProfilePage from "../pages/StaffProfilePage/StaffProfilePage";
import AppointmentProfilePage from "../pages/AppointmentProfilePage/AppointmentProfilePage";
import QRScanPage from "../pages/QRScanPage/QRScanPage";

import StaffTablePage from "../pages/StaffTablePage/StaffTablePage";
import ClinicProfile from "../components/ClinicProfile/ClinicProfile";
import StaffAppointmentTable from "../components/StaffAppointmentTable/StaffAppointmentTable";
import UserAppointmentTable from "../components/UserAppointmentTable/UserAppointmentTable";
import App from "../App";
import PATH from "./routerPath/publicPath";
import Header from "../components/Header/Header";
import PrivateRouter from "./customRouter/PrivateRouter";
import PayMentPage from "../pages/PayMentPage/PayMentPage";
import OpenDoctorCard from "../components/OpenDoctorCard/OpenDoctorCard";

const AppRouter = () => (
  <Routes>
    <Route path="/:page" element={<HomePage />}></Route>
    <Route exact path="/" element={<HomePage />}></Route>
    <Route exact path="*" element={<ErrorPage code={404} />} />
    <Route exact path={PATH.HOME_PAGE_PATH} element={<HomePage />} />
    <Route exact path={PATH.SIGN_UP_PATH} element={<SignUpPage />} />
    <Route exact path={PATH.ROLE_PICK_PATH} element={<RolePage />} />
    <Route exact path={PATH.LOGIN_PATH} element={<LoginPage />} />
    <Route exact path={PATH.BOOK_AP_PATH_STEP1} element={<BookApPage />} />
    <Route exact path={PATH.BOOK_AP_PATH_STEP2} element={<BookApPage2 />} />
    <Route exact path={PATH.BOOK_AP_PATH_STEP3} element={<BookApPage3 />} />
    <Route exact path={PATH.PAY_MENT} element={<PayMentPage />} />
    <Route
      exact
      path={PATH.STAFF_TABLE_PATH}
      element={
        <PrivateRouter component={StaffTablePage} accessibleRoles={["host"]} />
      }
    />
    {["host", "staff"].map((route) => (
      <Route
        exact
        path={`/${route}/clinic`}
        element={
          <PrivateRouter component={ClinicProfile} accessibleRoles={[route]} />
        }
      />
    ))}

    {["user", "staff"].map((route) => (
      <Route
        exact
        path={`/${route}/appointment/:appointmentId`}
        element={
          <PrivateRouter
            component={AppointmentProfilePage}
            accessibleRoles={[route]}
          />
        }
      />
    ))}
    <Route
      exact
      path={PATH.CLINIC_PROFILE_PATH}
      element={
        <PrivateRouter
          component={ClinicProfile}
          accessibleRoles={["host", "staff"]}
        />
      }
    />
    <Route
      exact
      path={PATH.STAFF_APPOINTMENTS_PATH}
      element={
        <PrivateRouter
          component={StaffAppointmentTable}
          accessibleRoles={["staff"]}
        />
      }
    />
    <Route
      exact
      path={PATH.STAFF_QRSCAN_PATH}
      element={
        <PrivateRouter component={QRScanPage} accessibleRoles={["staff"]} />
      }
    />
    <Route
      exact
      path={PATH.USER_APPOINTMENTS_PATH}
      element={
        <PrivateRouter
          component={UserAppointmentTable}
          accessibleRoles={["user"]}
        />
      }
    />
    <Route
      exact
      path={PATH.USER_DYNAMIC_PATH}
      element={
        <PrivateRouter
          component={UserProfilePage}
          accessibleRoles={["host", "staff", "user"]}
        />
      }
    />
    {/* for production deployment */}
    <Route path="/index.html" element={<Navigate to={PATH.HOME_PAGE_PATH} />} />
  </Routes>
);

export default AppRouter;
