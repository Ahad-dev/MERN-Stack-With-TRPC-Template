import React from 'react'
import UserSidebar from '@/modules/dashboard/ui/components/UserSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardNavbar from '@/modules/dashboard/ui/components/dashboard-navbar'
import { Outlet } from 'react-router'


const Layout = () => {
  return (
    <div>
      
      <SidebarProvider>
        <UserSidebar/>  
        <main className='flex flex-col h-screen w-screen'>
 
            <DashboardNavbar/>
            <Outlet/>
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Layout