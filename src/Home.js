import { useEffect } from "react"



export default function Home(){
    useEffect(()=>{
        document.title = 'JobBuddy | Home Page'
      })

    return <>
        Im Home
    </>
}