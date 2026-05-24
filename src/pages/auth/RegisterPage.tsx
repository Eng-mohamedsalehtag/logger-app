import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import * as authService from '@/services/authService'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  const validate = () => {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Name is required'
    if (!email.trim()) next.email = 'Email is required'
    if (password.length < 8) next.password = 'Password must be at least 8 characters'
    if (password !== confirm) next.confirm = 'Passwords do not match'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await authService.register({ name, email, password })
      login(res.user)
      navigate('/')
    } catch {
      setErrors({ form: 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Create your account</h1>
      <p className="mt-2 text-text-muted">Start monitoring your applications in minutes</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Input
          label="Full name"
          placeholder="Alex Morgan"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
          required
        />
        {errors.form && <p className="text-sm text-error">{errors.form}</p>}
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-accent-purple hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
