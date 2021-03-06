import React, { useEffect, useState } from 'react'
import faker from "faker"

function Suggestions() {
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        })
        )
        
        setSuggestions(suggestions)
    }, [])
    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400"> Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>
        
        {suggestions.map( (profile) => (
            <div kwey ={profile.id} className="flex items-center justify-between mt-3">
                <img alt="" className="w-10 h-10 rounded-full p-[2px]" src= "https://firebasestorage.googleapis.com/v0/b/instegram-83756.appspot.com/o/posts%2FRaX48qlIBChGiaLdbn17%2Fimage?alt=media&token=3149f2e6-e616-4d66-a244-95923dd091e4" />
                <div className="flex-1 ml-4">
                    <h2 className="font-semibold text-sm">{profile.username}</h2>
                    <h3 className="text-sm text-gray-400"> Works at {profile.company.name}</h3>
                </div>
                <button className="text-blue-400 text-xs font-bold">Follow</button>
            </div>

        ))}
            
        </div>
    )
}

export default Suggestions
