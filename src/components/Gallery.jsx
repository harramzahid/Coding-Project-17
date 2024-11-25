import React, { useState, useEffect } from "react";

const Gallery = () => {
  // Tours, loading, error state to hold tour data
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("https://course-api.com/react-tours-project");
        if (!response.ok) throw new Error("Failed to fetch tours");
        const data = await response.json();
        setTours(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // Remove tour functionality for the app
  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  // Toggle "Read More" functionality
  const toggleReadMore = (id) => {
    setTours(
      tours.map((tour) =>
        tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
      )
    );
  };

  // Loading state
  if (loading) return <p>Loading tours...</p>;

  // Error state
  if (error) return <p>Error: {error}</p>;

  // Render tours
  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} />
          <h2>{tour.name}</h2>
          <p>Price: ${tour.price}</p>
          <p>
            {tour.showMore ? tour.info : `${tour.info.substring(0, 100)}...`}
            <button onClick={() => toggleReadMore(tour.id)}>
              {tour.showMore ? "Show Less" : "Read More"}
            </button>
          </p>
          <button onClick={() => removeTour(tour.id)}>Not Interested</button>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
