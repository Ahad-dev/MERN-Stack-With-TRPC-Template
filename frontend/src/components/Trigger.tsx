import React from 'react'
import { useSidebar } from './ui/sidebar';
import { PanelLeftCloseIcon, PanelLeftIcon } from 'lucide-react';
import { Button } from './ui/button';

const Trigger = () => {
    const {state,toggleSidebar,isMobile} = useSidebar();

  return (
            <Button className='size-9 ' variant={"outline"} onClick={toggleSidebar}>
                {(state == "collapsed")
                    ? <PanelLeftIcon/>
                    : <PanelLeftCloseIcon/>
                }
            </Button>
    
  )
}

export default Trigger