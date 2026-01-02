"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useUserDetail } from '../provider';
import { TripInfo } from '../trip/_components/ChatBox';
import TripCard from './_components/TripCard';

export type Trip = {
    tripId: any,
    tripDetails: TripInfo,
    _id: string
}

function page() {

    const [myTrips, setMyTrips] = useState<Trip[]>([]);
    const { userDetail, setUserDetail } = useUserDetail();
    const convex = useConvex();

    useEffect(() => {
        userDetail && GetUserTrips();
    }, [userDetail]);

    const GetUserTrips = async () => {
        const result = await convex.query(api.tripDetail.GetUserTrips
            , { uid: userDetail?._id }
        );
        setMyTrips(result);
        console.log(result);
    }

    return (
        <div className='px-10 p-10 md:px-4 lg:px-48'>
            <h1 className='font-bold text-2xl'>My trips</h1>
            {myTrips?.length == 0 ?
                (<div className='p-7 flex flex-col items-center justify-center gap-5 mt-6'>
                    <h2 className='text-xl'>You don't have any trips planned</h2>
                    <Link href={'/trip'}>
                        <Button size='lg' className='cursor-pointer' >Create Trip</Button>
                    </Link>
                </div>)
                : (
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6'>
                        {myTrips.map((trip, index) => (
                            <TripCard trip={trip} key={index}/>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default page