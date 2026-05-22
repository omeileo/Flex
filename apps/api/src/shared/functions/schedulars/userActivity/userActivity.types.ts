export interface UserEngagementMetrics {
  activeUsers24h: number
  newUsers: number
  sessionsCreated: number
  avgSessionDuration: number
}

export interface SystemHealthMetrics {
  dbConnections: number
  apiRequests: number
  errorRate: number
  memoryUsage: number
}
