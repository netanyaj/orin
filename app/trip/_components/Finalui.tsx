import { Button } from '@/components/ui/button'
import { Earth, Globe, Plane } from 'lucide-react'
import React from 'react'

function Finalui({viewTrip,disable}:any) {
    return (
        <div className='flex flex-col items-center justofy-center p-4 mt-6 gap-2 bg-white rounded-2xl'>
            <Plane className= ' text-lg mt-2 animate-bounce'></Plane>
            <h2 className='text-primary font-semibold'>Planning your trip...</h2>
            <p className='text-sm text-gray-500 mt-1'>Gathering the best experiences and travel details for you.</p>
            <Button className='w-full mt-2' disabled={disable} onClick={viewTrip}>View trip</Button>
        </div>
    )
}

export default Finalui