import React from 'react'
import "./home.css"
import {Link} from "react-router-dom"
const Home = () => {
  return (
    <div className='home-container'>
       
        {/* <div className='home-header'>
            <h2>Login</h2>
            <h2>SignUp</h2>
        </div> */}

        <div className='right-continer'> 
            <div className='image-cont'></div>
            <div className='text-cont'>
                <h1>Most Trusted Brands</h1>
                <h4>The preferred destination for shopping varies among individuals, but popular choices include online platforms such as Amazon and physical stores like Walmart and Target. Factors influencing choices include product variety, pricing, and overall user experience. These preferences are dynamic, reflecting evolving consumer trends and preferences.</h4>
                
                <Link to="/login"><button className='explore-btn'>Explore Now </button></Link>
            </div>
        </div>
    </div>
  )
}

export default Home