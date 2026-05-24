import { AuthLayout } from '@/components/layout/AuthLayout'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { ApplicationDetailPage } from '@/pages/ApplicationDetailPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { Navigate, Route, Routes } from 'react-router-dom'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/applications/:name" element={<ApplicationDetailPage />} />
        <Route
          path="/logs"
          element={
            <PlaceholderPage
              title="Logs"
              description="Open an application from the dashboard to browse its logs."
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <PlaceholderPage
              title="Analytics"
              description="Analytics are available per application on the application detail page."
            />
          }
        />
        <Route
          path="/settings"
          element={
            <PlaceholderPage
              title="Settings"
              description="Account and workspace settings coming soon."
            />
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
