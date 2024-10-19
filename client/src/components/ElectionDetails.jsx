import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ElectionDetails = () => {
    const [selectedPosition, setSelectedPosition] = useState('');
    const [election,setElection]=useState({})
    const [selectedElection,setSelectedElection]=useState("")
    const params=useParams()
    let params1=params.electionId

    //fetch the specific elections data
    useEffect(()=>{
        fetch(`http://127.0.0.1:5555/election/${params1}`)
        .then(res=>res.json())
        .then(data=>{setElection(data)
        })
    },[])
    console.log(election)
    const positions = [
        {
            name: "President",
            candidates: [
                { name: "Juma Mwangi", party: "Kenya United Party", picture: "/images/juma-mwangi.jpg", description: "Visionary leader for national unity." },
                { name: "Wanjiru Karanja", party: "People's Alliance", picture: "/images/wanjiru-karanja.jpg", description: "Health care and youth engagement advocate." }
            ]
        },
        {
            name: "Governor",
            candidates: [
                { name: "Betty Ndung'u", party: "Progressive Movement", picture: "/images/betty-ndungu.jpg", county: "Nairobi County", description: "Improving infrastructure and services." },
                { name: "David Otieno", party: "Unity Front", picture: "/images/david-otieno.jpg", county: "Mombasa County", description: "Committed to economic growth." }
            ]
        },
        {
            name: "Senator",
            candidates: [
                { name: "Joseph Mutua", party: "National Vision Party", picture: "/images/joseph-mutua.jpg", county: "Kisumu County", description: "Advocating for devolution and county rights." },
                { name: "Grace Wambui", party: "New Democratic Party", picture: "/images/grace-wambui.jpg", county: "Kiambu County", description: "Fighting for better health services and transparency." }
            ]
        },
        {
            name: "MP",
            candidates: [
                { name: "Tom Mwangi", party: "People's Power Party", picture: "/images/tom-mwangi.jpg", constituency: "Nakuru Town West", description: "Focused on youth empowerment and education." },
                { name: "Sarah Njoroge", party: "United Progressive Alliance", picture: "/images/sarah-njoroge.jpg", constituency: "Lang'ata", description: "A champion of women's rights and economic reforms." }
            ]
        },
        {
            name: "MCA",
            candidates: [
                { name: "Michael Okoth", party: "Green Party", picture: "/images/michael-okoth.jpg", ward: "Kibra Ward", description: "Dedicated to solving local infrastructure challenges." },
                { name: "Lucy Mwikali", party: "Forward Alliance", picture: "/images/lucy-mwikali.jpg", ward: "Roysambu Ward", description: "Pushing for housing development and small business support." }
            ]
        }
    ];

    const elections = [
        { id: 1, name: "General Election" },
        { id: 2, name: "Runoff Election" }
    ];

    const handleVote = (candidate) => {
        const position = selectedPosition;

        // Check if the user already voted
        if (votes[position]) {
            setNotification(`You already voted for ${votes[position].name}.`);
            return;
        }

        // Update votes
        setVotes(prevVotes => ({ ...prevVotes, [position]: candidate }));
        setNotification(`You voted for ${candidate.name}`);
    };

    const handleElectionClick = (electionName) => {
        setSelectedElection(electionName);
        setSelectedPosition('');
        setVotes({}); // Clear votes when changing elections
        setNotification(''); // Clear notification when election changes

        // Update description for runoff
        if (electionName === "Runoff Election") {
            setRunoffDescription("This is a runoff election for the two leading presidential candidates.");
        } else {
            setRunoffDescription('');
        }
    };

    const NavBar = () => (
        <nav className="flex justify-center space-x-4 mb-4">
            {positions.map((position, index) => (
                <button
                    key={index}
                    className={`p-3 border rounded-lg ${selectedPosition === position.name ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'} hover:bg-blue-600 hover:text-white transition-colors duration-200`}
                    onClick={() => setSelectedPosition(position.name)}
                    aria-label={`Select ${position.name}`}
                >
                    {position.name}
                </button>
            ))}
        </nav>
    );

    return (
        <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg flex flex-col">
            <header className="text-center mb-6">
                <h1 className="text-5xl font-bold mb-4 text-gray-800">Election Details</h1>
                <p className="text-gray-600 mb-4">Please select an election to proceed to vote.</p>
            </header>

            {/* Election Selection */}
            {/* <div className="flex justify-center space-x-4 mb-6">
                {elections.map((election, index) => (
                    <button
                        key={index}
                        className={`p-3 border rounded-lg ${selectedElection === election.name ? 'bg-green-600 text-white' : 'bg-white text-gray-800'} hover:bg-green-600 hover:text-white transition-colors duration-200`}
                        onClick={() => handleElectionClick(election.name)}
                    >
                        {election.name}
                    </button>
                ))}
            </div> */}

            {/* Runoff Description */}
            {/* {selectedElection === "Runoff Election" && (
                <div className="text-center mb-6">
                    <p className="text-lg font-semibold text-gray-700">{runoffDescription}</p>
                </div>
            )} */}

            {/* Show NavBar only if General Election is selected */}
            {election.type === 'General' && <NavBar />}

            {/* Notification Section */}
            {/* {notification && (
                <div className="mb-4 p-4 bg-green-200 text-green-800 rounded">
                    {notification}
                </div>
            )} */}

            <main className="w-full">
                {selectedPosition && positions
                    .filter(position => position.name === selectedPosition)
                    .map((position, index) => (
                        <section key={index} className="mb-8">
                            <h2 className="text-4xl font-bold text-gray-700 mb-4">{position.name}</h2>
                            {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {selectedElection === 'Runoff Election'
                                    ? position.candidates.slice(0, 2).map((candidate, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out transform hover:scale-105">
                                            <img 
                                                src={candidate.picture} 
                                                alt={candidate.name} 
                                                className="h-40 w-40 rounded-full mx-auto mb-2 border-4 border-gray-300 shadow-lg"
                                            />
                                            <h3 className="text-xl font-semibold text-center text-gray-800">{candidate.name}</h3>
                                            <p className="text-sm italic text-center text-gray-500">({candidate.party})</p>
                                            <p className="mt-2 text-gray-700 text-sm">{candidate.description}</p>
                                            <button 
                                                className={`mt-4 ${votes[position.name]?.name === candidate.name ? 'bg-gray-400' : 'bg-blue-600'} text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md`}
                                                onClick={() => handleVote(candidate)}
                                                disabled={votes[position.name]?.name === candidate.name}
                                                aria-label={`Vote for ${candidate.name}`}
                                            >
                                                {votes[position.name]?.name === candidate.name ? 'Voted' : 'Vote'}
                                            </button>
                                        </div>
                                    ))
                                    : position.candidates.map((candidate, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out transform hover:scale-105">
                                            <img 
                                                src={candidate.picture} 
                                                alt={candidate.name} 
                                                className="h-40 w-40 rounded-full mx-auto mb-2 border-4 border-gray-300 shadow-lg"
                                            />
                                            <h3 className="text-xl font-semibold text-center text-gray-800">{candidate.name}</h3>
                                            <p className="text-sm italic text-center text-gray-500">({candidate.party})</p>
                                            <p className="mt-2 text-gray-700 text-sm">{candidate.description}</p>
                                            <button 
                                                className={`mt-4 ${votes[position.name]?.name === candidate.name ? 'bg-gray-400' : 'bg-blue-600'} text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md`}
                                                onClick={() => handleVote(candidate)}
                                                disabled={votes[position.name]?.name === candidate.name}
                                                aria-label={`Vote for ${candidate.name}`}
                                            >
                                                {votes[position.name]?.name === candidate.name ? 'Voted' : 'Vote'}
                                            </button>
                                        </div>
                                    ))}
                            </div> */}
                        </section>
                    ))}
            </main>
        </div>
    );
};

export default ElectionDetails;
