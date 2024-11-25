// components/Gallery.jsx
import React, { useState, useEffect } from 'react';

const API_URL = 'https://course-api.com/react-tours-project';

function Gallery() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch tours on component mount
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch tours');
                const data = await response.json();
                setTours(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    // Remove a tour
    const removeTour = (id) => {
        setTours(tours.filter(tour => tour.id !== id));
    };

    // Loading state
    if (loading) return <p>Loading...</p>;

    // Error state
    if (error) return <p>Error: {error}</p>;

    // Render tours
    return (
        <div>
            {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} removeTour={removeTour} />
            ))}
        </div>
    );
}

// Individual tour card
function TourCard({ tour, removeTour }) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <img src={tour.image} alt={tour.name} style={{ width: '100%' }} />
            <h2>{tour.name}</h2>
            <p>Price: ${tour.price}</p>
            <p>
                {showFullDescription
                    ? tour.info
                    : `${tour.info.substring(0, 100)}...`}
                <button onClick={() => setShowFullDescription(!showFullDescription)}>
                    {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
            </p>
            <button onClick={() => removeTour(tour.id)}>Not Interested</button>
        </div>
    );
}

export default Gallery;

