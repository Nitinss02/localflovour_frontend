import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// User Pages
import RoleSelection from "./pages/RoleSelection";
import ProfilePage from "./pages/ProfilePage";
import WelcomePage from "./pages/WelcomePage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import CreateNewPasswordPage from "./pages/CreateNewPasswordPage";
import SelectAddressPage from "./pages/SelectAddressPage";
import AddressConfirmationPage from "./pages/AddressConfirmationPage";
import OnboardingPage from "./pages/OnboardingPage";
import AboutUs from "./pages/AboutUspage";
import ContactUs from "./pages/ContactUspage";
import CategoriesPage from "./pages/CategoriesPage";
import TermsAndConditions from "./pages/TermsAndConditions";
import ReturnAndRefundPolicy from "./pages/ReturnAndRefundPolicy";

// Vendor Pages
import VendorLayout from "./vendor/components/VendorLayout";
import Dashboard from "./vendor/pages/Dashboard";

// Common Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import FoodItemDetails from "./components/FoodItemDetails";
import ShoppingCart from "./components/ShoppingCart";
import FoodPage from "./vendor/pages/FoodPage";
import SaleReport from "./vendor/pages/SaleReport";
import Profile from "./vendor/pages/Profile";
import FoodEditForm from "./vendor/components/FoodEditForm";
import VendorCreateNewPasswordPage from "./vendor/pages/VendorCreateNewPasswordPage";
import VendorOtpVerificationPage from "./vendor/pages/VendorOtpVerificationPage";
import VendorForgotPasswordPage from "./vendor/pages/VendorForgotPasswordPage";
import VendorLoginPage from "./vendor/pages/VendorLoginPage";
import VendorSignupPage from "./vendor/pages/VendorSignUpPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import VendorOrdersPage from "./vendor/pages/VendorOrdersPage";
import ManageAddressPage from "./pages/ManageAddressPage";
import OrderSuccessPage from "./components/OrderSucess";
import CheckoutPage from "./pages/CheckoutPage";
import FilteredFoodsPage from "./pages/FilteredFoodsPage";



// Main Layout Wrapper for User routes
const LayoutWrapper = () => {
  const location = useLocation();

  // Routes where we hide Header/Footer
  const hideHeaderFooterRoutes = [
    "/roleselection",
    "/profile",
    "/onboarding",
    "/welcome",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
    "/select-address",
    "/address-confirmation",
    "/vendor/dashboard",
    "/vendor/foodform",
    "/vendor/sales-report",
    "/vendor/profile",
    "/vendor/edit-food/:id",
    "/vendor/forgot-password",
    "/vendor/verify-otp",
    "/vendor/reset-password",
    "/vendor/login",
    "/vendor/signup",
    "/vendor/orders",
    "/checkout",
    "/order-success",
    "/manage-address",
  ];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.some((path) =>
    location.pathname.includes(path.replace("/:id", ""))
  );

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <div style={{ marginTop: !shouldHideHeaderFooter ? "60px" : "0px" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<OtpVerificationPage />} />
          <Route path="/reset-password" element={<CreateNewPasswordPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/return-refund" element={<ReturnAndRefundPolicy />} />
          <Route path="/roleselection" element={<RoleSelection />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/fooditemdetails/:id" element={<FoodItemDetails />} />
          <Route path="/foods" element={<FilteredFoodsPage />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute allowedRole="user" />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/select-address" element={<SelectAddressPage />} />
            <Route path="/address-confirmation" element={<AddressConfirmationPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/manage-address" element={<ManageAddressPage />} />
          </Route>

          {/* Vendor Authentication Routes */}
          <Route path="/vendor/login" element={<VendorLoginPage />} />
          <Route path="/vendor/signup" element={<VendorSignupPage />} />
          <Route path="/vendor/forgot-password" element={<VendorForgotPasswordPage />} />
          <Route path="/vendor/verify-otp" element={<VendorOtpVerificationPage />} />
          <Route path="/vendor/reset-password" element={<VendorCreateNewPasswordPage />} />

          {/*Protected Vendor Routes */}
          <Route path="/vendor" element={<ProtectedRoute allowedRole="vendor" />}>
            <Route element={<VendorLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="foodform" element={<FoodPage />} />
              <Route path="sales-report" element={<SaleReport />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edit-food/:id" element={<FoodEditForm />} />
              <Route path="orders" element={<VendorOrdersPage />} />
            </Route>
          </Route>
        </Routes>
      </div>
      {!shouldHideHeaderFooter && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <LayoutWrapper />
      </AuthProvider>
    </Router>
  );
}


export default App;
