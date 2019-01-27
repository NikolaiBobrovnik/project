import axios from 'axios'
import { API_URL, API_URL_TEMPLATES } from './constants/API'
import { isDevelopment, isServer } from 'utils'

export let axiosAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

export let axiosLocal = axios.create({
  baseURL: '/server/',
  withCredentials: true,
  // on dev server side get local data from client webpack server
  proxy: isServer
    ? {
      host: 'localhost',
      port: isDevelopment
        ? parseInt(process.env.REACT_APP_CLIENT_PORT)
        : parseInt(process.env.REACT_APP_PORT) || 8080
    }
    : undefined
})

export let axiosTemplates = axios.create({
  baseURL: API_URL_TEMPLATES,
  withCredentials: true
})
