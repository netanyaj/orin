"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Send, Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyState from './EmptyState'
import HeadCount from './HeadCount'
import Budget from './Budget'
import Duration from './Duration'
import Finalui from './Finalui'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useTripDetail, useUserDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid'

type Message = {
    role: string;
    content: string;
    ui?: string;
}

export type TripInfo = {
    budget: string,
    destination: string,
    duration: string,
    group_size: string,
    origin: string,
    hotels: Hotel[],
    itinerary: Itinerary[]
}

export type Hotel = {
    hotel_name: string,
    hotel_address: string,
    price_per_night: string,
    hotel_image_url: string,
    geo_coordinates: {
        latitude: number,
        longitude: number
    },
    rating: number,
    description: string
}

export type Activity = {
    place_name: string,
    place_details: string,
    place_image_url: string,
    geo_coordinates: {
        latitude: number,
        longitude: number
    };
    place_address: string,
    ticket_pricing: string,
    time_travel_each_location: string,
    best_time_to_visit: string
}

export type Itinerary = {
    day: number,
    day_plan: string,
    best_time_to_visit_day: string,
    activities: Activity[]
}

function ChatBox() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFinal, setIsFinal] = useState<boolean>(false);
    const [tripDetails, setTripDetails] = useState<TripInfo>();
    const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
    const { userDetail, setUserDetail } = useUserDetail();
    //@ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

    const onSend = async (value?: string) => {
        const inputMsg = typeof value === 'string' ? value : userInput;
        if (!inputMsg?.trim()) {
            return;
        }
        setUserInput("");
        setIsLoading(true);
        const newMessage: Message = { role: "user", content: inputMsg };
        setMessages((prev: Message[]) => [...prev, newMessage]);
        const res = await axios.post('/api/aimodel', {
            messages: [...messages, newMessage],
            isFinal: isFinal
        })
        console.log(res.data);
        !isFinal && setMessages((prev: Message[]) => [...prev, { role: "assistant", content: res?.data?.resp, ui: res?.data?.ui }]);
        if (isFinal) {
            setTripDetails(res?.data?.trip_plan);
            setTripDetailInfo(res?.data?.trip_plan);
            const tripId = uuidv4();
            const result = await SaveTripDetail({
                tripDetails: res?.data?.trip_plan,
                tripId: tripId,
                uid: userDetail?._id
            })
        }
        setIsLoading(false);
    }

    const renderGenerativeUI = (ui: string | undefined) => {
        if (ui === 'groupSize') {
            return <HeadCount onSelectOption={(v: string) => { onSend(v); }} />;
        } else if (ui === 'budget') {
            return <Budget onSelectOption={(v: string) => { onSend(v); }} />;
        } else if (ui === 'tripDuration') {
            return <Duration onSelectOption={(v: string) => { onSend(v); }} />;
        } else if (ui === 'final') {
            return <Finalui viewTrip={() => console.log()} disable={!tripDetails}></Finalui>;
        }
        return null;
    }

    useEffect(() => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.ui === 'final') {
            setIsFinal(true);
            setUserInput('Okay, Great!')
        }
    }, [messages]);

    useEffect(() => {
        if (isFinal && userInput) {
            onSend();
        }
    }, [isFinal]);

    return (
        <div className='relative w-full h-[80vh] flex flex-col'>
            {/* display messages */}
            {messages.length === 0 && <EmptyState onSelectOption={(v: string) => { onSend(v); }} />}
            <section className='flex-1 overflow-y-auto p-4'>
                {messages.map((msg, index) => (
                    msg.role === 'user' ?
                        <div className='flex justify-end mt-2' key={index}>
                            <div className='max-w-l bg-primary text-white rounded-lg px-4 py-2'>
                                {msg.content}
                            </div>
                        </div>
                        :
                        <div className='flex justify-start mt-2' key={index}>
                            <div className='max-w-md bg-gray-100 text-black rounded-lg px-4 py-2'>
                                {msg.content}
                                {msg.ui ? renderGenerativeUI(msg.ui) : null}
                            </div>
                        </div>
                ))}
                {isLoading && <div className='flex justify-start mt-2'>
                    <div className='max-w-l bg-gray-100 text-black rounded-lg px-4 py-2'>
                        <Loader className='animate-spin h-4 w-4' />
                    </div>
                </div>
                }
            </section>

            {/* input box */}
            <section>
                <div className='relative w-full'>
                    <div className='border rounded-2xl p-4 shadow-md relative'>
                        <Textarea placeholder='Start typing here...'
                            className='w-full h-28 focus-visible:ring-0 bg-transparent border-none shadow-none resize-none'
                            onChange={(event) => setUserInput(event.target.value)} value={userInput}></Textarea>
                        <Button size={'icon'} className='absolute bottom-6 right-6 cursor-pointer' onClick={() => onSend()} disabled={isLoading}><Send className='h-4 w-4' /></Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ChatBox