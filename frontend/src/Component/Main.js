import React from 'react';
//import Chatbot from './Chatbot';
import {  getSession } from './session';

function Main(props) {
    const isLoggedIn = getSession("isLoggedIn") || false;
    console.log("Logged User in Main Page : ", isLoggedIn.isLoggedIn)
    

    return (
        <div className='Main-Container' style={{textAlign:'center'}}> 
            {/* <Chatbot /> */}
            <div className='Containers'>
                <div className='flex-box'>
                    <div className='flex-box-1'>
                    <img className='img1' alt='boy' src='./heat_pump_customer.jpg'></img>
                    </div>

                    <div className='flex-box-2' >
                        <h1>Earn free electricity on a Sunday!</h1>
                        <p>Our Sunday Saver challenge helps all our customers save cash and carbon while contributing to a more sustainable national electricity grid. 
                            The more electricity you shift during week-day peak times(2), the more free electricity you can earn! 
                            Shift 50% of your peak-time usage to earn the maximum of 16 free hours to use the following Sunday.
                            You'll need to join us and have a smart meter that sends us readings every 30 minutes to take part</p>
                        <button className='btn btn-secondary'>Save cash and Carbon</button>
                    </div>
                </div>
            </div>
            <div className='mid-head' style={{marginTop:'20px'}}>
                <h1>Save cash and carbon</h1>
                <p>We’re investing in carbon-cutting technology and supporting government schemes to make low-carbon living for everyone.</p>
            </div>
            <div className='Containers'>
                <div className='flex-box cards'>
                    
                    <div className='card'>
                    <img alt='Leaf' src='./leaf.jpg'></img>
                    <p>We’re busy<b> building Britain’s wind, nuclear and solar energy supply </b>to reduce our reliance on importing energy from abroad and help prevent future gas price rises.</p>
                    </div>
                    <div className='card'>
                        <img  alt='Home' src='./home.jpg'></img>
                        <p>We're proud to power over 3.7 million homes and services like the NHS, Royal Mail and government.</p>
                    </div>
                    <div className='card'>
                        <img alt='Thumb' src='./thumb.jpg'></img>
                        <p>We're <b> dedicated to supporting our most vulnerable customers.</b> This year, we're investing over £200 million to help our customers save money and reduce their carbon footprint.</p>
                    </div>
                </div>
            </div>
            <div className='mid-head' style={{marginTop:'20px'}}>
                <h1>cash and carbon Reviews</h1>
                <p>We’re investing in carbon-cutting technology and supporting government schemes to make low-carbon living for everyone.</p>
            </div>
            <div className='Containers'>
                <div className='flex-box '>
                    <div className='card-bottom'>
                        <div>
                            {/* <span class="material-symbols-outlined">reviews</span> */}
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                        </div>

                        
                        <div className='rating'></div>
                        <p>I have been with EDF for many years and have always found their contact centre very efficient. In this instance, Emma helped and supported me to quickly change my tariff to a more beneficial one. </p>
                        <p><b>Kay S,</b> 13 February 2025</p>
                    </div>
                    <div className='card-bottom'>
                        <div>
                            {/* <span class="material-symbols-outlined">reviews</span> */}
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                        </div>
                        <div className='rating'></div>
                        <p>Best ever experience talking to customer service! I wholeheartedly recommend EDF  to anyone in need of exceptional customer service. Thank you for making a potentially stressful situation completely stress-free!</p>
                        <p><b>Yiannis,</b> 13 February 2025</p>
                    </div>
                </div>
            </div>

            <footer>
              <div> 
                    <p> CopyRight @ 2024-25 || EDF Energy</p>
              </div>
            </footer>
        </div>
    );
}

export default Main;