import faker from "faker"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Story from "./Story"

function Stories() {
    const {data: session} = useSession()
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        })
        )
        console.log(suggestions)
        setSuggestions(suggestions)
    }, [])
    return (
        <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">

            {session && (
                <Story 
                img= {session?.user?.image}
                username= {session?.user?.username}

                 />
            )}
            <Story 
                img= "https://firebasestorage.googleapis.com/v0/b/instegram-83756.appspot.com/o/posts%2FRaX48qlIBChGiaLdbn17%2Fimage?alt=media&token=3149f2e6-e616-4d66-a244-95923dd091e4"
                username= "Dean Barber"

                 />
            <Story 
                img= "https://firebasestorage.googleapis.com/v0/b/instegram-83756.appspot.com/o/posts%2FRaX48qlIBChGiaLdbn17%2Fimage?alt=media&token=3149f2e6-e616-4d66-a244-95923dd091e4"
                username= "Dean Barber"

                 />
            {suggestions.map( (profile) => (
                <Story 
                key={profile.id} 
                img= "https://firebasestorage.googleapis.com/v0/b/instegram-83756.appspot.com/o/posts%2FRaX48qlIBChGiaLdbn17%2Fimage?alt=media&token=3149f2e6-e616-4d66-a244-95923dd091e4"
                username= {profile.username}

                 />
            ))}
                    
            {suggestions.map( (profile) => (
                <Story 
                key={profile.id} 
                img= {profile.avatar}
                username= {profile.username}

                 />
            ))}
            {/*Story */}
            {/*Story */}
            {/*Story */}
            {/*Story */}
            {/*Story */}
            {/*Story */}
            {/*Story */}
            {/*Story */}
            {/*Story */}
            
        </div>
    )
}

export default Stories
