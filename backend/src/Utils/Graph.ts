import axios from "axios"

const graphToken = axios.create({
  baseURL: `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
})

const createGraphURL = (token) => {
  const graph = axios.create({
    baseURL: "https://graph.microsoft.com/v1.0/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return graph
}

export const getToken = async () => {
  try {
    const response = await graphToken.post("", {
      client_id: process.env.CLIENT_ID,
      scope: process.env.CLIENT_ESCOPE,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "client_credentials",
    })
    return response.data.access_token
  } catch (error) {
    console.log(error)
  }
}

export const getGraphData = async (path: string, id: null | string = null) => {
    const token = await getToken()
    if (!token) {
      throw new Error("Token is undefined")
    }
    const graph = createGraphURL(token)
    const response = await graph.get(id ? `${path}/${id}` : path)
    return response.data
}