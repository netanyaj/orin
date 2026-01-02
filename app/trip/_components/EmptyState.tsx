import { suggestions } from "@/app/_components/Hero"

function EmptyState({ onSelectOption }: any) {
    return (
        <div>
            <h2 className='text-2xl font-semibold text-center mt-10'>Start a conversation to plan your trip!</h2>
            <p className='text-center mt-4 text-gray-600 pe-5'> Discover personalized travel itineraries, find the best places to visit, and create unforgettable experiences. </p>
            <div className='flex flex-row gap-4 mt-8 justify-center flex-wrap'>
                {suggestions.map((suggestion, index) => (
                    <div key={index} className='flex items-center gap-2 text-accent-foreground border rounded-full p-2 cursor-pointer hover:border-primary hover:scale-105 transition-all'
                        onClick={() => onSelectOption(suggestion.text)}>
                        {suggestion.icon}
                        <h3 className='text-sm'>{suggestion.text}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EmptyState