import React, { useEffect, useState } from 'react'
import { Trip } from '../page'
import Image from 'next/image'
import { ArrowBigRight } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'

type Props = {
    trip: Trip,
}

function TripCard({ trip }: Props) {

    const [thumbnail, setThumbnail] = useState<string>();

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: trip?.tripDetails?.destination
        });
        if (result?.data?.e) {
            return;
        }
        setThumbnail(result?.data);
    }

    useEffect(() => {
        trip && GetGooglePlaceDetail();
    }, [trip]);


    return (
        trip?.tripDetails?.destination != '' &&
        <Link href={`/view-trip/${trip?.tripId}`} className='p-5 shadow rounded-2xl'>
            <Image src={thumbnail || '/logo.svg'} alt={trip.tripId} width={400} height={400}
                className='rounded-xl object-cover w-full h-[270px]' />
            <h2 className='flex gap-2 font-semibold text-xl mt-2'>{trip?.tripDetails?.origin}<ArrowBigRight /> {trip?.tripDetails?.destination}</h2>
            <h2 className='mt-2 text-gray-500'>{trip?.tripDetails?.duration} trip with {trip?.tripDetails?.budget} budget</h2>
        </Link>
    )
}

export default TripCard