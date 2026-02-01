import { lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage'));
const CatalogPage = lazy(() => import('../pages/CatalogPage/CatalogPage'));
const CamperDetailsPage = lazy(
  () => import('../pages/CamperDetailsPage/CamperDetailsPage')
);
const Features = lazy(() => import('../components/Features/Features'));
const Reviews = lazy(() => import('../components/Reviews/Reviews'));

const AppRouter = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:id" element={<CamperDetailsPage />}>
          <Route index element={<Navigate to="features" replace />} />
          <Route path="features" element={<Features />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRouter;
