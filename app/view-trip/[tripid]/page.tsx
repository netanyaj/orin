"use client"
import { useTripDetail, useUserDetail } from '@/app/provider';
import GlobalMap from '@/app/trip/_components/GlobalMap';
import Itinerary from '@/app/trip/_components/Itinerary';
import { Trip } from '@/app/view-trips/page';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ViewTrip() {
    const { tripid } = useParams();

    const { userDetail, setUserDetail } = useUserDetail();
    const [tripData, setTripData] = useState<Trip>();
    // @ts-ignore
    const {tripDetailInfo,setTripDetailInfo} = useTripDetail();
    const convex = useConvex();

    useEffect(() => {
        userDetail && GetTrip();
    }, [userDetail]);

    const GetTrip = async () => {
        const result = await convex.query(api.tripDetail.GetTripById
            , { uid: userDetail?._id, tripid: tripid + '' }
        );
        console.log(result);
        setTripData(result);
        setTripDetailInfo(result?.tripDetails);
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-5 p-10 gap-5'>
            <div className='col-span-3'>
                <Itinerary/>
            </div>
            <div className='col-span-2'>
                <GlobalMap/>
            </div>
        </div>
    )
}

export default ViewTrip