import Image from 'next/image'
import AuthForm from './components/AuthForm'

export default function Home() {
  return (
    <main className="flex items-center justify-center bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#000000] via-[#2a2929] to-[#000000] min-h-screen">
      
        <AuthForm />

    </main>
  )
}
