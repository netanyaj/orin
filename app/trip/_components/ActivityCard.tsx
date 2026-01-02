"use client"
import React, { useEffect, useState } from 'react'
import { Activity } from './ChatBox'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import axios from 'axios'

type Props = {
    activity: Activity,
}

function ActivityCard({ activity }: Props) {

    const [thumbnail, setThumbnail] = useState<string>();

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: activity?.place_name + ":" + activity?.place_address
        });
        if (result?.data?.e) {
            return;
        }
        setThumbnail(result?.data);
    }

    useEffect(() => {
        activity && GetGooglePlaceDetail();
    }, [activity]);

    return (
        <div className='flex flex-col gap-2'>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow mb-2">
                <Image
                    src={thumbnail || '/logo.svg'}
                    alt={activity.place_name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                />
            </div>
            <h3 className="mt-2 font-semibold">{activity.place_name}</h3>
            <div className='flex flex-col mt-2 mb-2 gap-2'>
                <p className="text-sm font-medium  text-amber-700 line-clamp-1"><Ticket />{activity?.ticket_pricing}</p>
                <p className="text-sm font-medium text-blue-400 line-clamp-1"><Clock />{activity?.best_time_to_visit}</p>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{activity.place_details}</p>
            <Link href={'https://www.google.com/maps/search/?api=1&query=' + activity?.place_name} target='_blank'>
                <Button variant={'outline'} className='mt-auto cursor-pointer w-full'>View on map</Button>
            </Link>
        </div>
    )
}

export default ActivityCard