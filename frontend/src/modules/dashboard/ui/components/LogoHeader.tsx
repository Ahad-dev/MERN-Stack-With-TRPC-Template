import { useSidebar } from '@/components/ui/sidebar'
import React from 'react'
import { Link } from 'react-router'

const LogoHeader = () => {
      const {state} = useSidebar()
  
  return (
    <Link to='/' className='font-[Outfit] flex items-center gap-2 text-xl hover:scale-105 transition-all duration-300'>
        <img src="/logo.png" alt="LOGO" height={100} width={40} />
        {state == "expanded" && <span className='text-foreground'>HR.360</span>}
    </Link>
  )
}

export default LogoHeader