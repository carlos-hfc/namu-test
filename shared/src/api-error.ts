export class ApiError extends Error {
  public readonly statusCode: number
  public readonly code?: string

  constructor(message: string, statusCode = 500, code?: string) {
    super(message)

    this.name = "ApiError"
    this.code = code
    this.statusCode = statusCode
  }
}

export function parseApiError(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiError) return error

  const err = error as any
  const statusCode = err.response.status ?? 500
  const message = err.response.data.message

  return new ApiError(message || fallbackMessage, statusCode)
}
