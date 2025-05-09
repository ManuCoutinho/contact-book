import HomeView from '@/views/home'
import { getContacts } from '@/services'

export default async function Home() {
  const contacts = await getContacts()

  return <HomeView data={contacts} />
}
