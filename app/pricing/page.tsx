import React from 'react'

import { PricingTable } from '@clerk/nextjs'

export default function Pricing() {
    return (
        <div className='pt-10'>
            <div className='font-bold text-primary text-2xl my-5 text-center mb-10'>Upgrade to our subscription plan</div>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                <PricingTable />
            </div>
        </div>
    )
}

