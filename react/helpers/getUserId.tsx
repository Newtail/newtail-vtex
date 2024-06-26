import axios from 'axios'

export const getUserIdByEmail = async (email: string) => {
  try {
    const response = await axios.get(
      `/api/dataentities/CL/search?_where=email%3D'${email}'&_fields=id`
    )

    const userId = response.data[0]?.id as string

    return userId ?? null
  } catch (error) {
    console.error('Error fetching user ID:', error)

    return null
  }
}
