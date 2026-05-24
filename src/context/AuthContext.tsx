import type { User } from '@/types/auth'
import * as authService from '@/services/authService'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const USER_KEY = 'observify_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const useMock = import.meta.env.VITE_USE_MOCK !== 'false'

      if (useMock) {
        const storedUser = sessionStorage.getItem(USER_KEY)
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser) as User)
          } catch {
            sessionStorage.removeItem(USER_KEY)
          }
        }
        setIsLoading(false)
        return
      }

      const current = await authService.getCurrentUser()
      if (current) {
        setUser(current)
        sessionStorage.setItem(USER_KEY, JSON.stringify(current))
      } else {
        sessionStorage.removeItem(USER_KEY)
      }
      setIsLoading(false)
    }

    init()
  }, [])

  const login = useCallback((newUser: User) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(newUser))
    setUser(newUser)
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch {
      // clear local state even if server logout fails
    }
    sessionStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
