"use client"
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from './contexts/UserDetailContext';
import { TripContextType, TripDetailContext } from './contexts/TripDetailContext';
import { TripInfo } from './trip/_components/ChatBox';

// client side component
function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const createUser = useMutation(api.user.CreateNewUser);
    const { user } = useUser();

    const [userDetail, setUserDetail] = useState<any>();
    const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);

    useEffect(() => {
        user && createNewUser()
    }, [user]);

    const createNewUser = async () => {
        if (user) {
            const result = await createUser({
                name: user.firstName || '',
                email: user.primaryEmailAddress?.emailAddress || '',
                imageUrl: user.imageUrl || ''
            });
            setUserDetail(result);
        }
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo}}>
                <div>
                    {/* common header component for all pages  */}
                    <Header />
                    {children}
                </div>
            </TripDetailContext.Provider>
        </UserDetailContext.Provider >
    )
}

export default Provider

// shortcuts for contexts
export const useUserDetail = () => { return useContext(UserDetailContext); }
export const useTripDetail = (): TripContextType | undefined => { return useContext(TripDetailContext); }