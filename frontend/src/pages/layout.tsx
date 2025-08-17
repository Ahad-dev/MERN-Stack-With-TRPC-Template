import React from 'react'
import UserSidebar from '@/modules/dashboard/ui/components/UserSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardNavbar from '@/modules/dashboard/ui/components/dashboard-navbar'
import { Outlet, useNavigate } from 'react-router'
import { authClient } from '@/lib/auth'


const Layout = () => {
  const {data:session,isPending} = authClient.useSession()
  const navigate = useNavigate()

  if (isPending) {
    return <div>Loading...</div>
  }
  console.log("Session data:", session);

  if (!session) {
    navigate('/sign-up')
  }

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