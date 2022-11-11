import React from 'react'
import useAuth from './useAuth'

export default function Dashboard({code}){
    const accessToken = useAuth(code)
    return (
        <div>
            {code}
            {/* <h1>search bar for recipes</h1> */}
        </div>
    )
}