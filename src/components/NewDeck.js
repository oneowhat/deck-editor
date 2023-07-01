import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from './Form';

function NewDeck() {

  const navigate = useNavigate();

  const [deckAttributes, setDeckAttributes] = useState({
    deckName: '',
    rows: 10,
    columns: 7
  });

  const fields = [
    {
      name: 'deckName',
      label: 'Deck name',
      type: 'text'
    },
    {
      name: 'columns',
      label: 'Columns',
      type: 'number'
    },
    {
      name: 'rows',
      label: 'Rows',
      type: 'number'
    },
  ];

  const handleSubmit = (nextDeckAttributes) => {
    setDeckAttributes(nextDeckAttributes);
    navigate('/');
  };

  if (true) {
    return <Form 
      fields={fields}
      values={deckAttributes}
      onSubmit={handleSubmit}
      submitButtonText="Next" />
  }
}

export default NewDeck;