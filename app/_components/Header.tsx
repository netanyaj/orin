import { Button } from '@/components/ui/button'
import { SignInButton, SignUp, UserButton, useUser } from '@clerk/nextjs'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const menuOptions = [
    { name: 'Home', link: '/' },
    { name: 'Pricing', link: '/pricing' },
    { name: 'Contact', link: '/contact' },
]

function Header() {
    const { user } = useUser();

    const path = usePathname();

    return (
        <div className='flex justify-between items-center p-6'>
            {/* logo */}
            <div className='flex items-center gap-2'>
                <Image src="/logo.svg" alt="Logo" width={40} height={48} />
                <h2 className='font-bold text-2xl'>Orin</h2>
            </div>
            {/* menu options */}
            <div className='flex gap-2 items-center'>
                {menuOptions.map((option) => (
                    <Link key={option.name} href={option.link} className='mx-4 text-lg hover:scale-105 transition-all hover:text-primary'>
                        {option.name}
                    </Link>
                ))}
            </div>
            {/* cta button */}
            {!user ? (
                <SignInButton mode='modal'>
                    <Button className='cursor-pointer'>
                        Get Started
                    </Button>
                </SignInButton>
            ) : (
                path == '/trip' ? (
                    <div className='flex items-center gap-5'>
                        <Link href='/view-trips'>
                            <Button className='cursor-pointer'>
                                View Trips
                            </Button>
                        </Link>
                        <UserButton></UserButton>
                    </div>
                ) : (
                    <div className='flex items-center gap-5'>
                        <Link href='/trip'>
                            <Button className='cursor-pointer'>
                                Create Trip
                            </Button>
                        </Link>
                        <UserButton></UserButton>
                    </div>
                )
            )}
        </div>
    )
}

export default Header