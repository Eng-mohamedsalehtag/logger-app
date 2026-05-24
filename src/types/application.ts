export interface Application {
  id: string
  name: string
  createdAt: string
  logCount: number
}

export interface ApplicationDetail extends Application {
  lastActivity: string | null
}
