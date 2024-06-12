import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layouts Imports.
import HomeLayout from "./layouts/HomeLayout";

// import pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));

const ProjectRoutes = () => {
    return (
        <React.Suspense>
            <Router>
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<Navigate to="/" />} />
                        <Route path="/sign-in" element={<LoginPage  />} />
                        <Route path="/sign-up" element={<SignUpPage  />} />
                    </Route>
                </Routes>
            </Router>
        </React.Suspense>

    )
}

export default ProjectRoutes;