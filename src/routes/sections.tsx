import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { DashboardLayout } from 'src/layouts/dashboard';

// Lazy load pages
const HomePage = lazy(() => import('src/sections/overview/view').then(m => ({ default: m.OverviewAnalyticsView })));
const SignInPage = lazy(() => import('src/sections/auth/sign-in-view').then(m => ({ default: m.SignInView })));
const Page404 = lazy(() => import('src/sections/error/not-found-view').then(m => ({ default: m.NotFoundView })));
const ProductsPage = lazy(() => import('src/sections/product/view').then(m => ({ default: m.ProductsView })));
const BlogPage = lazy(() => import('src/sections/blog/view').then(m => ({ default: m.BlogView })));
const UserPage = lazy(() => import('src/sections/user/view').then(m => ({ default: m.UserView })));

export function Router() {
  const routes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'sign-in',
      element: <SignInPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ];

  const element = useRoutes(routes);

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
} 