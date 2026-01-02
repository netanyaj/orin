"use client"
import { Button } from '@/components/ui/button';
import { Timeline } from '@/components/ui/timeline'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard';
import ActivityCard from './ActivityCard';
import { useTripDetail } from '@/app/provider';
import { Activity, TripInfo } from './ChatBox';
import Image from 'next/image';


function Itinerary() {
    // @ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
    const [tripDetails, setTripDetails] = useState<TripInfo | null>(null);

    useEffect(() => {
        tripDetailInfo && setTripDetails(tripDetailInfo);
    }, [tripDetailInfo]);

    const data = tripDetails ? [
        {
            title: "Recommended Hotels",
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {tripDetails.hotels.map((hotel, index) => (
                        <HotelCard hotel={hotel} key={index}></HotelCard>
                    ))}
                </div>
            )
        },
        ...tripDetails.itinerary.map((day, index) => ({
            title: `Day ${day?.day}`,
            content: (
                <div className='flex flex-col gap-5'>
                    <h2>Best time: {day?.best_time_to_visit_day}</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {day.activities.map((activity: Activity, index: React.Key | null | undefined) => (
                            <ActivityCard activity={activity} key={index}></ActivityCard>
                        ))}
                    </div>
                </div>
            )

        }))
    ] : [];

    return (
        <div className="relative w-full h-[80vh] overflow-auto">
            {tripDetails ? <Timeline data={data} tripData={tripDetails} />
                :
                <div className='relative w-full h-full'>
                    <div className="relative w-full h-[80vh] rounded-2xl overflow-auto">
                        <Image
                            src="/initial.jpg"
                            alt="Trip cover"
                            fill
                            className="object-cover"
                        />
                    </div>

                </div>
            }
        </div>

    );
}


export default Itinerary