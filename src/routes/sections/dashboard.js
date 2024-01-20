import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard, RoleBasedGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/home'));
const ForUserPage = lazy(() => import('src/pages/dashboard/forUserPage'));

const ProfilePage = lazy(() => import('src/pages/dashboard/profile'));

const EmergencyPage = lazy(() => import('src/pages/dashboard/all-emergency'));

const MyWorksPage = lazy(() => import('src/pages/dashboard/my-works/my-works'));
const MyWorksAddPage = lazy(() => import('src/pages/dashboard/my-works/my-work-add'));
const MyWorksEditPage = lazy(() => import('src/pages/dashboard/my-works/my-work-edit'));

const FieldsPage = lazy(() => import('src/pages/dashboard/fields/fields'));
const FieldsAddPage = lazy(() => import('src/pages/dashboard/fields/fields-add'));
const FieldsEditPage = lazy(() => import('src/pages/dashboard/fields/fields-edit'));

const WorkersPage = lazy(() => import('src/pages/dashboard/workers/workers'));
const WorkerAddPage = lazy(() => import('src/pages/dashboard/workers/worker-add'));
const WorkerEditPage = lazy(() => import('src/pages/dashboard/workers/worker-edit'));

const WorkProgramPage = lazy(() => import('src/pages/dashboard/work-program/work-program'));
const WorkProgramAddPage = lazy(() => import('src/pages/dashboard/work-program/work-program-add'));
const WorkProgramEditPage = lazy(() =>
  import('src/pages/dashboard/work-program/work-program-edit')
);

const WorkTypesPage = lazy(() => import('src/pages/dashboard/work-types/work-types'));
const WorkTypesAddPage = lazy(() => import('src/pages/dashboard/work-types/work-types-add'));
const WorkTypesEditPage = lazy(() => import('src/pages/dashboard/work-types/work-types-edit'));

const ReportsPage = lazy(() => import('src/pages/dashboard/reports/daily-working-reports'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },

      {
        path: 'for-admin-page',
        element: (
          <RoleBasedGuard hasContent roles={['True']}>
            <ForUserPage />
          </RoleBasedGuard>
        ),
      },

      {
        path: 'profile',
        children: [{ element: <ProfilePage />, index: true }],
      },

      {
        path: 'my-works',
        children: [
          {
            element: (
              <RoleBasedGuard hasContent roles={['False']}>
                <MyWorksPage />
              </RoleBasedGuard>
            ),
            index: true,
          },
          { path: 'add', element: <MyWorksAddPage /> },
          { path: ':id/edit', element: <MyWorksEditPage /> },
        ],
      },

      {
        path: 'fields',
        children: [
          {
            element: (
              <RoleBasedGuard hasContent roles={['True']}>
                <FieldsPage />
              </RoleBasedGuard>
            ),
            index: true,
          },
          { path: 'add', element: <FieldsAddPage /> },
          { path: ':id/edit', element: <FieldsEditPage /> },
        ],
      },

      {
        path: 'workers',
        children: [
          {
            element: (
              <RoleBasedGuard hasContent roles={['True']}>
                <WorkersPage />
              </RoleBasedGuard>
            ),
            index: true,
          },
          { path: 'add', element: <WorkerAddPage /> },
          { path: ':id/edit', element: <WorkerEditPage /> },
        ],
      },

      {
        path: 'work-program',
        children: [
          {
            element: <WorkProgramPage />,
            index: true,
          },
          { path: 'add', element: <WorkProgramAddPage /> },
          { path: ':id/edit', element: <WorkProgramEditPage /> },
        ],
      },

      {
        path: 'work-types',
        children: [
          {
            element: (
              <RoleBasedGuard hasContent roles={['True']}>
                <WorkTypesPage />
              </RoleBasedGuard>
            ),
            index: true,
          },
          { path: 'add', element: <WorkTypesAddPage /> },
          { path: ':id/edit', element: <WorkTypesEditPage /> },
        ],
      },

      {
        path: 'all-emergency',
        children: [
          {
            element: (
              <RoleBasedGuard hasContent roles={['True']}>
                <EmergencyPage />
              </RoleBasedGuard>
            ),
            index: true,
          },
        ],
      },

      {
        path: 'reports',
        children: [
          {
            element: (
              <RoleBasedGuard hasContent roles={['True']}>
                <ReportsPage />
              </RoleBasedGuard>
            ),
            index: true,
          },
        ],
      },

      // {
      //   path: 'group',
      //   children: [
      //     { element: <PageFour />, index: true },
      //     { path: 'five', element: <PageFive /> },
      //     { path: 'six', element: <PageSix /> },
      //   ],
      // },
    ],
  },
];
