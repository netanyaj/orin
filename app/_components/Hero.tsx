"use client"
import { Button } from '@/components/ui/button'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { ArrowDownIcon, Globe2, Landmark, Sailboat, Send, Sparkle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const suggestions = [
    {text: 'Create a new trip', icon: <Globe2 className='h-4 w-4 text-blue-500' />},
    {text: 'Surprise me', icon: <Sparkle className='h-4 w-4 text-amber-400' />},
    {text: 'Discover hidden gems', icon: <Landmark className='h-4 w-4 text-red-500' />},
    {text: 'Adventure destinations', icon: <Sailboat className='h-4 w-4 text-lime-600' />},
]

function Hero() {
    const {user} = useUser();
    const router = useRouter();

    const onSend = () => {
        if (!user) {
            router.push('/sign-in');
            return;
        } else {
            // proceed with sending the trip plan request
            router.push('/trip');
            return;
        }
    }

return (
    <div className='mt-24 w-full flex justify-center flex-col items-center'>
        {/* Content */}
            {/* tagline */}
            <div className='max-w-3xl w-full text-center space-y-6 mb-8'>
                <h1 className='text-xl md:text-5xl font-bold'>Plan better. Travel easier.</h1>
                <p className='text-lg text-accent-foreground'>Orin plans your trip so you don't have to.
    From routes to daily plans, create intelligent itineraries designed around how you actually travel.</p>
            </div>
            {/* input box */}
            <div className='w-full max-w-2xl'>
                <div className='border rounded-2xl p-4 shadow-md relative'>
                    <Textarea placeholder='Plan a weekend trip to Paris' 
                    className='w-full h-28 focus-visible:ring-0 bg-transparent border-none shadow-none resize-none'></Textarea>
                    <Button size={'icon'} className='absolute bottom-6 right-6 cursor-pointer' onClick={() => onSend()}><Send className='h-4 w-4'/></Button>
                </div>
            </div>
            {/* suggestions */}
            <div className='flex gap-5'>
                {suggestions.map((suggestion, index) => (
                    <div key={index} className='mt-6 flex items-center gap-2 text-accent-foreground border rounded-full p-2 cursor-pointer hover:border-primary hover:scale-105 transition-all'>
                        {suggestion.icon}
                        <h2 className='text-sm'>{suggestion.text}</h2>
                    </div>
                ))}
            </div>
            {/* demo video section */}
            <h2 className='my-7 mt-14 flex text-center gap-2'>Not sure where to start? <strong>Watch Orin in action</strong><ArrowDownIcon/></h2> 
            <HeroVideoDialog
                className="block dark:hidden"
                animationStyle="from-center"
                videoSrc="https://www.example.com/dummy-video"
                thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                thumbnailAlt="Dummy Video Thumbnail"
            />
    </div>
)
}
export default Hero