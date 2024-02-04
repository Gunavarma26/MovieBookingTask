import React, { useEffect, useState } from 'react';
import '../style/book.css';

const MoveApp = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeatsOne, setBookedSeatsOne] = useState([]);
    const [bookedSeatsTwo, setBookedSeatsTwo] = useState([]);
    const [bookedSeatsThree, setBookedSeatsThree] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('one');
    const [moviePrice, setMoviePrice] = useState(200); // Default price for movie one

    useEffect(() => {
        switch (selectedMovie) {
            case 'one':
                setMoviePrice(200);
                break;
            case 'two':
                setMoviePrice(150);
                break;
            case 'three':
                setMoviePrice(250);
                break;
            default:
                break;
        }
    }, [selectedMovie]);

    const seatSelection = (id) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(id)) {
                return prevSelectedSeats.filter((seatId) => seatId !== id);
            } else {
                return [...prevSelectedSeats, id];
            }
        });
    };

    const bookSelectedSeats = () => {
        let updatedBookedSeats;
        switch (selectedMovie) {
            case 'one':
                updatedBookedSeats = [...bookedSeatsOne, ...selectedSeats];
                setBookedSeatsOne(updatedBookedSeats);
                break;
            case 'two':
                updatedBookedSeats = [...bookedSeatsTwo, ...selectedSeats];
                setBookedSeatsTwo(updatedBookedSeats);
                break;
            case 'three':
                updatedBookedSeats = [...bookedSeatsThree, ...selectedSeats];
                setBookedSeatsThree(updatedBookedSeats);
                break;
            default:
                break;
        }

        setSelectedSeats([]);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedSeats([]);
        setSelectedMovie(value);
    };

    const getBookedSeats = () => {
        switch (selectedMovie) {
            case 'one':
                return bookedSeatsOne;
            case 'two':
                return bookedSeatsTwo;
            case 'three':
                return bookedSeatsThree;
            default:
                return [];
        }
    };

    const bookedSeatsCount = getBookedSeats().length;
    const bookedSeatsPrice = bookedSeatsCount * moviePrice;

    const Seat = ({ id, isSelected, isBooked, onSelect }) => {
        let seatClassName = 'seat';
        if (isSelected) {
            seatClassName += ' selected';
        }
        if (isBooked) {
            seatClassName += ' booked';
        }
    
        const handleClick = () => {
            if (!isBooked) {
                onSelect(id);
            }
        };
    
        return (
            <div
                className={seatClassName}
                onClick={handleClick}
            ></div>
        );
    };
    

    const seats = [];
    for (let i = 1; i <= 48; i++) {
        seats.push(
            <Seat
                key={i}
                id={i}
                isSelected={selectedSeats.includes(i)}
                isBooked={getBookedSeats().includes(i)}
                onSelect={seatSelection}
            />
        );
    }

    const selectedSeatsCount = selectedSeats.length;
    const selectedSeatsPrice = selectedSeatsCount * moviePrice;

    return (
        <div className='container'>
            <div className='titlecon'>
                <h3 className='title'>SELECT A MOVIE: </h3>
                <select className='dropdown' onChange={handleChange} value={selectedMovie}>
                    <option value="one">Avengers Endgame (200)</option>
                    <option value="two">Toy Story 4 (150)</option>
                    <option value="three">Joker (250)</option>
                </select>
            </div>

            <div className='demo'>
                <div>
                    <p className='nan'></p><span>N/A</span>
                </div>
                <div>
                    <p className='green'></p><span>Selected</span>
                </div>
                <div>
                    <p className='black'></p><span>Occupied</span>
                </div>
            </div>
            <br />
            <div className="seats-container">{seats}</div>
            <p>You have selected {selectedSeatsCount + bookedSeatsCount} seats for a price of {selectedSeatsPrice + bookedSeatsPrice}</p>

            <button className='book' onClick={bookSelectedSeats}>BOOK</button>
        </div>
    );
};

export default MoveApp;
