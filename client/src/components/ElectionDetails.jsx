import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ElectionDetails = () => {
    const [selectedPosition, setSelectedPosition] = useState('');
    const [election,setElection]=useState({})
    const params=useParams()
    let params1=params.electionId

    //fetch the specific elections data
    useEffect(()=>{
        fetch(`http://127.0.0.1:5555/election/${params1}`)
        .then(res=>res.json())
        .then(data=>setElection(data))
    },[])
    console.log(election)
    const positions = [
        {
            name: "President",
            candidates: [
                {
                    name: "Juma Mwangi",
                    party: "Kenya United Party",
                    picture: "path/to/juma-mwangi.jpg",
                    description: "A visionary leader focused on economic growth and national unity."
                },
                {
                    name: "Wanjiru Karanja",
                    party: "People's Alliance",
                    picture: "path/to/wanjiru-karanja.jpg",
                    description: "Dedicated to health care improvements and youth engagement."
                }
            ]
        },
        {
            name: "Governor",
            candidates: [
                {
                    name: "Betty Ndung'u",
                    party: "Progressive Movement",
                    picture: "path/to/betty-ndungu.jpg",
                    description: "Focused on improving local infrastructure and health services.",
                    county: "Nairobi County"
                },
                {
                    name: "David Otieno",
                    party: "Unity Front",
                    picture: "path/to/david-otieno.jpg",
                    description: "Committed to economic development and job creation.",
                    county: "Mombasa County"
                }
            ]
        },
        {
            name: "Senator",
            candidates: [
                {
                    name: "Alice Mwikali",
                    party: "Democratic Alliance",
                    picture: "path/to/alice-mwikali.jpg",
                    description: "Champion of women's rights and education access.",
                    county: "Nairobi County"
                },
                {
                    name: "Franklin Kibet",
                    party: "New Vision Party",
                    picture: "path/to/franklin-kibet.jpg",
                    description: "Advocate for social justice and community welfare.",
                    county: "Kisumu County"
                }
            ]
        },
        {
            name: "Member of Parliament (MP)",
            candidates: [
                {
                    name: "Cynthia Wambui",
                    party: "National Reform Party",
                    picture: "path/to/cynthia-wambui.jpg",
                    description: "Focused on enhancing education and healthcare services.",
                    constituency: "Kasarani",
                    county: "Nairobi County",
                    ward: "Kasarani Ward"
                },
                {
                    name: "Peter Maina",
                    party: "Citizens' Voice",
                    picture: "path/to/peter-maina.jpg",
                    description: "Dedicated to representing the interests of the youth.",
                    constituency: "Kibera",
                    county: "Nairobi County",
                    ward: "Kibera Ward"
                }
            ]
        },
        {
            name: "Member of County Assembly (MCA)",
            candidates: [
                {
                    name: "Sarah Wangari",
                    party: "Unity Front",
                    picture: "path/to/sarah-wangari.jpg",
                    description: "Passionate about youth and community development.",
                    constituency: "Nairobi County",
                    county: "Nairobi County",
                    ward: "Lang'ata Ward"
                },
                {
                    name: "Julius Kiptoo",
                    party: "Progressive Movement",
                    picture: "path/to/julius-kiptoo.jpg",
                    description: "Advocate for local businesses and environmental sustainability.",
                    constituency: "Uasin Gishu",
                    county: "Uasin Gishu County",
                    ward: "Eldoret North Ward"
                }
            ]
        }
    ];

    // NavBar component integrated within ElectionDetails
    const NavBar = () => {
        return (
            <nav className="flex justify-center space-x-4 mb-4">
                {positions.map((position, index) => (
                    <button
                        key={index}
                        className={`p-3 border rounded-lg ${
                            selectedPosition === position.name ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
                        } hover:bg-blue-600 hover:text-white transition-colors duration-200`}
                        onClick={() => setSelectedPosition(position.name)}
                        aria-label={`Select ${position.name}`}
                    >
                        {position.name}
                    </button>
                ))}
            </nav>
        );
    };

    const handleVote = (candidate) => {
        // Implement voting logic here
        alert(`You voted for ${candidate.name}`);
    };

    return (
        <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg flex flex-col">
            <header className="text-center mb-6">
                <h1 className="text-5xl font-bold mb-4 text-gray-800">Election Details</h1>
                <p className="text-gray-600 mb-4">Choose a position to vote for candidates.</p>
            </header>

            <NavBar />

            <main className="w-full">
                {selectedPosition && positions
                    .filter(position => position.name === selectedPosition)
                    .map((position, index) => (
                        <section key={index} className="mb-8">
                            <h2 className="text-4xl font-bold text-gray-700 mb-4">{position.name}</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {position.candidates.map((candidate, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
                                        <img 
                                            src={candidate.picture} 
                                            alt={candidate.name} 
                                            className="h-40 w-40 rounded-full mx-auto mb-2 border-4 border-gray-300 shadow-lg"
                                        />
                                        <h3 className="text-xl font-semibold text-center text-gray-800">{candidate.name}</h3>
                                        <p className="text-sm italic text-center text-gray-500">({candidate.party})</p>
                                        <p className="mt-2 text-gray-700 text-sm">{candidate.description}</p>
                                        {selectedPosition === "Governor" && (
                                            <p className="text-sm text-center text-gray-600">County: {candidate.county}</p>
                                        )}
                                        {selectedPosition === "Senator" && (
                                            <p className="text-sm text-center text-gray-600">County: {candidate.county}</p>
                                        )}
                                        {selectedPosition === "Member of Parliament (MP)" && (
                                            <div className="text-sm text-center text-gray-600">
                                                <p>Constituency: {candidate.constituency}</p>
                                                <p>County: {candidate.county}</p>
                                                <p>Ward: {candidate.ward}</p>
                                            </div>
                                        )}
                                        {selectedPosition === "Member of County Assembly (MCA)" && (
                                            <div className="text-sm text-center text-gray-600">
                                                <p>Constituency: {candidate.constituency}</p>
                                                <p>County: {candidate.county}</p>
                                                <p>Ward: {candidate.ward}</p>
                                            </div>
                                        )}
                                        <button 
                                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                                            onClick={() => handleVote(candidate)}
                                            aria-label={`Vote for ${candidate.name}`}
                                        >
                                            Vote
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
            </main>
        </div>
    );
};

export default ElectionDetails;