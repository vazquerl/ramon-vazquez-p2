import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DropSpotScheduler = () => {
    const [dropSpots, setDropSpots] = useState([]);
    const [selectedSpot, setSelectedSpot] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');

    useEffect(() => {
        const fetchDropSpots = async () => {
            const response = await axios.get('http://localhost:5000/api/dropspot');
            setDropSpots(response.data);
        };
        fetchDropSpots();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/meetup/schedule', {
                dropSpotId: selectedSpot,
                scheduledDateTime: scheduledDate,
            });
            alert('Meetup Scheduled!');
        } catch {
            alert('Failed to Schedule Meetup');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select onChange={(e) => setSelectedSpot(e.target.value)}>
                <option value="">Select Drop Spot</option>
                {dropSpots.map((spot) => (
                    <option key={spot.id} value={spot.id}>
                        {spot.name} - {spot.address}
                    </option>
                ))}
            </select>
            <input
                type="datetime-local"
                onChange={(e) => setScheduledDate(e.target.value)}
            />
            <button type="submit">Schedule</button>
        </form>
    );
};

export default DropSpotScheduler;