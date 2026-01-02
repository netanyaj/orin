import React from "react";

export const groupSizeList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A solo traveler in exploration",
        icon: "✈️",
        people: "1",
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Two traveles in tandem",
        icon: "🥂",
        people: "2 People",
    },
    {
        id: 3,
        title: "Family",
        desc: "A group of fun loving people",
        icon: "🏡",
        people: "3 to 5 People",
    },
    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill-seekes",
        icon: "⛵",
        people: "5 to 10 People",
    },
];

function HeadCount({ onSelectOption }: any) {
    return (<div className='flex flex-row gap-4 mt-8 justify-center flex-wrap'>
        {groupSizeList.map((item, index) => (
            <div key={index} className='flex items-center gap-2 bg-white border rounded-lg p-2 cursor-pointer hover:border-primary hover:scale-105 transition-all'
                onClick={() => onSelectOption(item.title + ":" + item.people)}>
                {item.icon}
                <h3 className='text-sm'>{item.title}</h3>
            </div>
        ))}
    </div>
    )
}

export default HeadCount;
