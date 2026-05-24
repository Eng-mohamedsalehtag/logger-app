import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import * as authService from '@/services/authService'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authService.login({ email, password })
      login(res.user)
      if (remember) localStorage.setItem('observify_remember', email)
      navigate('/')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Welcome back</h1>
      <p className="mt-2 text-text-muted">Sign in to your Observify account</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-border bg-surface text-accent-purple focus:ring-accent-purple/50"
            />
            Remember me
          </label>
          <a href="#" className="text-sm text-accent-purple hover:underline">
            Forgot password?
          </a>
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-text-muted">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-accent-purple hover:underline">
          Create account
        </Link>
      </p>
    </div>
  )
}
