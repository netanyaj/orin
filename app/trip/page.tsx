"use client"
import React, { useEffect, useState } from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'
import { useTripDetail } from '../provider'
import GlobalMap from './_components/GlobalMap';
import { Button } from '@/components/ui/button'
import { Globe2, Plane } from 'lucide-react'


function CreateNewTrip() {
    // @ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => (
        setTripDetailInfo(null)
    ), [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-5 p-10 gap-5'>
            <div className='col-span-2'><ChatBox /></div>
            <div className='col-span-3'>
                {activeIndex == 0 ? <Itinerary /> : <GlobalMap />}
                <div className='flex justify-center mt-2'>
                    <Button variant={'outline'}
                        onClick={() => setActiveIndex(activeIndex == 0 ? 1 : 0)}
                        size="lg" className=' cursor-pointer hover:bg-accent-foreground'>
                        {activeIndex === 0 ? <Globe2 /> : <Plane />}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateNewTrip