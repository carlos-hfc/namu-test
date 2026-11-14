import axios from "axios"

export interface HttpClient {
  baseURL: string
}

export const httpClient = ({ baseURL }: HttpClient) =>
  axios.create({
    baseURL,
  })
