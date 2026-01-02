import React from "react";

export const budgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
        color: 'bg-green-100 text-green-600'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
        color: 'bg-yellow-100 text-yellow-600'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don’t worry about cost',
        icon: '💸',
        color: 'bg-purple-100 text-purple-600'
    },

]

function Budget({ onSelectOption }: any) {
    return (<div className='flex flex-row gap-4 mt-8 justify-space-around'>
        {budgetOptions.map((item, index) => (
            <div key={index} className='flex items-center gap-2  bg-white border rounded-lg p-2 cursor-pointer hover:border-primary hover:scale-105 transition-all'
                onClick={() => onSelectOption(item.title)}>
                {item.icon}
                <h3 className='text-sm'>{item.title}</h3>
            </div>
        ))}
    </div>
    )
}

export default Budget;
