import React from 'react';
import './team.css';

const Team = () => {
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Meet our Team</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto grid max-w-7xl px-6 lg:px-8">
                    <div className="team-container flex justify-center gap-8">
                        <div className="team-member-box flex items-center gap-x-6">
                            <img
                                className="h-16 w-16 rounded-full"
                                src="fyras.jpg"
                                alt="Fyras Tibi"
                            />
                            <div>
                                <h3 className="text-base font-semibold tracking-tight text-gray-900">Fyras Tibi</h3>
                                <p className="text-sm font-semibold text-indigo-600">Co-Founder / CEO</p>
                            </div>
                        </div>

                        <div className="team-member-box flex items-center gap-x-6">
                            <img
                                className="h-16 w-16 rounded-full"
                                src="kada.jpg"
                                alt="Hamza Kada"
                            />
                            <div>
                                <h3 className="text-base font-semibold tracking-tight text-gray-900">Hamza Kada</h3>
                                <p className="text-sm font-semibold text-indigo-600">Co-Founder / CEO</p>
                            </div>
                        </div>
                         
                        {/* More people... */}
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
       
            
           
            <br></br>
        </div>
    );
};

export default Team;
