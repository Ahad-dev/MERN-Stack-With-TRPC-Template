import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { PanelLeftCloseIcon, PanelLeftIcon } from 'lucide-react'
import React from 'react'

import { Bell,MessageCircleMore } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const NOTIFICATION_ITEM = [
    {
        title: "Account Created Successfully !!",
        description: "Welcome to HR.360, your account has been created successfully.",
        time: "Just now"
    },
    {
        title: "New Feature Alert",
        description: "We have added a new feature to the dashboard.",
        time: "2 hours ago"
    },
    {
        title: "System Maintenance",
        description: "The system will be down for maintenance on Sunday.",
        time: "1 day ago"
    }

]

const DashboardNavbar = () => {
    const {state,toggleSidebar} = useSidebar()
  return (
    <nav className='flex px-4 gap-x-2 items-center justify-between py-3 border-b bg-background'>
        <Button className='size-9 ' variant={"outline"} onClick={toggleSidebar}>
            {(state == "collapsed")
                ? <PanelLeftIcon/>
                : <PanelLeftCloseIcon/>
            }
        </Button>
        <div className='flex items-center gap-x-4'>
            <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className='size-9'>
                    <Bell className='size-5'/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className='flex flex-col gap-y-2'>
                    <h1 className='text-lg font-semibold'>Notifications</h1>
                    {/* make the notification Item */}
                    {NOTIFICATION_ITEM.length == 0?
                    <p className='text-muted-foreground'>You have no new notifications</p>
                        :NOTIFICATION_ITEM.map((item, index) => (
                            <div key={index} className='flex flex-col gap-y-1 p-2 border rounded-md'>
                                <h2 className='font-semibold'>{item.title}</h2>
                                <p className='text-sm text-muted-foreground'>{item.description}</p>
                                <span className='text-xs text-muted-foreground'>{item.time}</span>
                            </div>
                        ))

                       
                    }
                    
                </div>

            </DialogContent>
            </Dialog>
            <Button variant={"ghost"} className='size-9'>
                <MessageCircleMore className='size-5'/>
            </Button>
        </div>
    </nav>
  )
}

export default DashboardNavbar