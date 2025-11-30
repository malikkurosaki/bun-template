// ⚡ AUTO-GENERATED — DO NOT EDIT
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Skeleton } from "@mantine/core";

const SkeletonLoading = () => {
  return (
    <div style={{ padding: "20px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} height={70} radius="md" animate={true} mb="sm" />
      ))}
    </div>
  );
};

/**
 * Prefetch lazy component:
 * - Hover
 * - Visible (viewport)
 * - Browser idle
 */
export function attachPrefetch(el: HTMLElement | null, preload: () => void) {
  if (!el) return;
  let done = false;

  const run = () => {
    if (done) return;
    done = true;
    preload();
  };

  // 1) On hover
  el.addEventListener("pointerenter", run, { once: true });

  // 2) On visible (IntersectionObserver)
  const io = new IntersectionObserver((entries) => {
    if (entries && entries[0] && entries[0].isIntersecting) {
      run();
      io.disconnect();
    }
  });
  io.observe(el);

  // 3) On idle
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => run());
  } else {
    setTimeout(run, 200);
  }
}

const Login = {
  Component: React.lazy(() => import("./pages/Login")),
  preload: () => import("./pages/Login"),
};

const Home = {
  Component: React.lazy(() => import("./pages/Home")),
  preload: () => import("./pages/Home"),
};

const Register = {
  Component: React.lazy(() => import("./pages/Register")),
  preload: () => import("./pages/Register"),
};

const ConfigLayout = {
  Component: React.lazy(() => import("./pages/dashboard/config/config_layout")),
  preload: () => import("./pages/dashboard/config/config_layout"),
};

const ConfigPage = {
  Component: React.lazy(() => import("./pages/dashboard/config/config_page")),
  preload: () => import("./pages/dashboard/config/config_page"),
};

const ApikeyPage = {
  Component: React.lazy(() => import("./pages/dashboard/apikey/apikey_page")),
  preload: () => import("./pages/dashboard/apikey/apikey_page"),
};

const DashboardPage = {
  Component: React.lazy(() => import("./pages/dashboard/dashboard_page")),
  preload: () => import("./pages/dashboard/dashboard_page"),
};

const DashboardLayout = {
  Component: React.lazy(() => import("./pages/dashboard/dashboard_layout")),
  preload: () => import("./pages/dashboard/dashboard_layout"),
};

const NotFound = {
  Component: React.lazy(() => import("./pages/NotFound")),
  preload: () => import("./pages/NotFound"),
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<SkeletonLoading />}>
              <Login.Component />
            </React.Suspense>
          }
        />

        <Route
          path="/"
          element={
            <React.Suspense fallback={<SkeletonLoading />}>
              <Home.Component />
            </React.Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <React.Suspense fallback={<SkeletonLoading />}>
              <Register.Component />
            </React.Suspense>
          }
        />

        <Route path="/dashboard" element={<DashboardLayout.Component />}>
          <Route index element={<DashboardPage.Component />} />

          <Route path="/dashboard/config" element={<ConfigLayout.Component />}>
            <Route index element={<ConfigPage.Component />} />

            <Route
              path="/dashboard/config/config"
              element={
                <React.Suspense fallback={<SkeletonLoading />}>
                  <ConfigPage.Component />
                </React.Suspense>
              }
            />
          </Route>

          <Route
            path="/dashboard/apikey/apikey"
            element={
              <React.Suspense fallback={<SkeletonLoading />}>
                <ApikeyPage.Component />
              </React.Suspense>
            }
          />

          <Route
            path="/dashboard/dashboard"
            element={
              <React.Suspense fallback={<SkeletonLoading />}>
                <DashboardPage.Component />
              </React.Suspense>
            }
          />
        </Route>

        <Route
          path="/*"
          element={
            <React.Suspense fallback={<SkeletonLoading />}>
              <NotFound.Component />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
