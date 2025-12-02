"use client";
import Link from 'next/link';

export default function Footer() {
    const current_year = new Date().getFullYear();
  return (
    <div className='w-full bg-linear-to-br from-purple-800 via-black to-purple-800  p-8 text-white
            shadow-2xl hover:shadow-purple-500/50
            transition-all duration-500 hover:scale-105
            backdrop-blur-xl border border-white/10 '>
        <div className='text-center py-4'>
            <Link href='https://gamingstoreym-55uyorh6b-yeiner-morenos-projects.vercel.app/privacy' target='_blank' className='text-neon-purple text-glow-purple btn btn-link'>Privacy</Link>
            <span> | </span>
            <Link href='https://gamingstoreym-55uyorh6b-yeiner-morenos-projects.vercel.app/terms' target='_blank' className='text-neon-purple text-glow-purple btn btn-link'>Terms</Link>
            <span> | </span>
            <Link href='/contact' className='text-neon-purple text-glow-purple btn btn-link'>Contact</Link>
            <p className='text-neon-white text-glow-white text-ms'>Copyright &copy; {current_year}, GamingStore LLC, All Rights Reserved</p>

        </div>
    </div>
  )
}
