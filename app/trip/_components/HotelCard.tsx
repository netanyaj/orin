"use client"
import React, { useEffect, useState } from 'react'
import { Hotel } from './ChatBox'
import { ExternalLink, Star, Wallet2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'

type Props = {
    hotel: Hotel,
}

function HotelCard({ hotel }: Props) {

    const [thumbnail, setThumbnail] = useState<string>();

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: hotel?.hotel_name
        });
        if (result?.data?.e) {
            return;
        }
        setThumbnail(result?.data);

    }

    useEffect(() => {
        hotel && GetGooglePlaceDetail();
    }, [hotel]);

    return (
        <div className='flex flex-col gap-2'>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow mb-2">
                <Image
                    src={thumbnail || '/logo.svg'}
                    alt={hotel.hotel_name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                />
            </div>
            <h3 className="mt-2 font-semibold">{hotel?.hotel_name}</h3>
            <div className='flex justify-between items-center mt-2 mb-1'>
                <p className="text-sm font-medium text-green-600"><Wallet2 className='stroke-green-600' />{hotel.price_per_night}</p>
                <p className="text-sm font-medium text-yellow-500"><Star className='stroke-yellow-500' />{hotel.rating}</p>
            </div>
            <p className="text-sm text-gray-600 mb-1 line-clamp-2">{hotel?.description}</p>
            <Link href={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotel_name} target='_blank'>
                <Button variant={'outline'} className='mt-auto cursor-pointer w-full'>View on map</Button>
            </Link>
        </div>
    )
}

export default HotelCard