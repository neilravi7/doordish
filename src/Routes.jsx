import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import Auth Component's
import SignUpForm from "./components/Auth/AuthCanvas/SignUpForm";
import LoginForm from "./components/Auth/AuthCanvas/LoginForm";

// Layouts Imports.
import HomeLayout from "./layouts/HomeLayout";
import VendorAuthLayout from "./layouts/VendorAuthLayout";
import VendorLayout from "./layouts/VendorLayout";

// import pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));
const RestaurantMenuPage = React.lazy(() => import('./pages/RestaurantMenuPage'));
const VendorHomePage = React.lazy(() => import('./pages/Vendor/VendorHomePage'));
const VendorMenuPage = React.lazy(() => import('./pages/Vendor/VendorMenuPage'));
const ProductDetail = React.lazy(() => import("./pages/Vendor/ProductDetail"));
const VendorProfile = React.lazy(() => import("./pages/Vendor/VendorProfile"));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const CustomerProfilePage = React.lazy(() => import('./pages/CustomerProfilePage'))
// const DemoCart = React.lazy(() => import('./pages/DemoCart'));

const ProjectRoutes = () => {
    return (
        <React.Suspense>
            <Router>
                <Routes>
                    {/* Customer Layout Or Common Layout */}
                    <Route path="/" element={<HomeLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<Navigate to="/" />} />
                        <Route path="/sign-in" element={<LoginPage  />} />
                        <Route path="/sign-up" element={<SignUpPage  />} />
                        <Route path="/restaurant/:vendorId/items/" element={<RestaurantMenuPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        {/* <Route path="/demo/cart" element={<DemoCart />} /> */}
                        <Route path="/customer/profile" element={<CustomerProfilePage />}/>
                    </Route>

                    {/* Vendor Auth Layout */}
                    <Route path="/partners" element={<VendorAuthLayout />}>
                        <Route path="/partners/sign-in" element={<LoginForm/>}/>
                        <Route path="/partners/sign-up" element={<SignUpForm/>}/>
                    </Route>

                    {/* Vendor Dashboard */}
                    <Route path={"/vendor"} element={<VendorLayout />}>
                        <Route path={"/vendor/home"} element={<VendorHomePage />} />
                        <Route path={"/vendor/menu"} element={<VendorMenuPage />} />
                        <Route path={"/vendor/product/:productId"} element={<ProductDetail />} />
                        <Route path={"/vendor/profile"} element={<VendorProfile />} />
                    </Route>
                </Routes>
            </Router>
        </React.Suspense>

    )
}

export default ProjectRoutes;