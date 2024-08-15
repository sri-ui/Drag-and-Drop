import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import CanvasDraw from 'react-canvas-draw';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([
    { id: '1', text: 'This is a sample card with some dummy text.', image: 'https://via.placeholder.com/150', detailedText: 'Detailed text for card 1' },
    { id: '2', text: 'Another card with more dummy text.', image: 'https://via.placeholder.com/150', detailedText: 'Detailed text for card 2' },
  ]);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleDrag = (e, data, id) => {
    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, x: data.x, y: data.y } : card
    );
    setCards(updatedCards);
  };

  const handleResize = (event, { element, size }, id) => {
    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, width: size.width, height: size.height } : card
    );
    setCards(updatedCards);
  };

  const addCard = () => {
    const newCard = {
      id: (cards.length + 1).toString(),
      text: 'New card with dummy text.',
      image: 'https://via.placeholder.com/150',
      detailedText: 'Detailed text for new card',
      x: 0,
      y: 0,
      width: 200,
      height: 100,
    };
    setCards([...cards, newCard]);
  };

  const showMore = (card) => {
    setSelectedCard(card);
  };

  const closePopup = () => {
    setSelectedCard(null);
  };

  return (
    <div className="canvas-container">
      <button onClick={addCard}>Add Card</button>
      <CanvasDraw
        canvasWidth={800}
        canvasHeight={600}
        hideGrid
        brushRadius={2}
        lazyRadius={0}
      />
      {cards.map(card => (
        <Draggable
          key={card.id}
          position={{ x: card.x || 0, y: card.y || 0 }}
          onStop={(e, data) => handleDrag(e, data, card.id)}
        >
          <ResizableBox
            width={card.width || 200}
            height={card.height || 100}
            minConstraints={[100, 50]}
            maxConstraints={[400, 300]}
            onResize={(e, data) => handleResize(e, data, card.id)}
          >
            <div className="card">
              <img src={card.image} alt="Card" />
              <p>{card.text}</p>
              <button onClick={() => showMore(card)}>Show More</button>
            </div>
          </ResizableBox>
        </Draggable>
      ))}
      {selectedCard && (
        <div className="popup">
          <div className="popup-content">
            <h2>Card Details</h2>
            <p>{selectedCard.detailedText}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
