import axios from "axios"

export interface HttpClient {
  baseURL: string
}

export const httpClient = ({ baseURL }: HttpClient) =>
  axios.create({
    baseURL,
  })

export const api = httpClient({ baseURL: "" })

export const configureApi = ({ baseURL }: HttpClient) =>
  (api.defaults.baseURL = baseURL)
