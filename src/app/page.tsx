import HomeView from '@/views/home'
import { getContacts } from '@/services'

export default async function Home() {
  const contacts = await getContacts('1')
  console.log('😵‍💫', contacts)
  return <HomeView data={contacts} />
}
