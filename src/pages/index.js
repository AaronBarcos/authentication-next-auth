import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>Next.js + Tailwind CSS</h1>
      <h1>
        Welcome to my personal project of social media app.
      </h1>
      <h3>
        Please, login or register to start using it.
      </h3>

    </div>
  )
}