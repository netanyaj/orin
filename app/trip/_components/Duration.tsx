import { Button } from '@/components/ui/button'
import { Counter } from '@/components/ui/shadcn-io/counter'
import React from 'react'

function Duration({ onSelectOption }: any) {
    const [days, setDays] = React.useState(0);
    return (
        <div className='flex flex-col items-center gap-1 mt-2 bg-white rounded-2xl'>
            <p className='mt-1'>Select trip duration</p>
            <Counter number={days} setNumber={setDays}></Counter>
            <Button className='mt-4 mb-2 bg-primary text-white' onClick={() => onSelectOption(days + " days")}>Confirm</Button>
        </div>

    )
}

export default Duration