import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { add } from '../services/deckService';

import Form from './Form';

function NewDeck() {

  const navigate = useNavigate();
  const { projectId } = useParams();

  const [deckAttributes, setDeckAttributes] = useState({
    projectId,
    name: '',
    rowCount: 10,
    columnCount: 7
  });

  const fields = [
    {
      name: 'name',
      label: 'Deck name',
      type: 'text'
    },
    {
      name: 'columnCount',
      label: 'Columns',
      type: 'number'
    },
    {
      name: 'rowCount',
      label: 'Rows',
      type: 'number'
    },
  ];

  const handleSubmit = (nextAttributes, setErrors) => {
    const deck = { projectId, ...nextAttributes };
    add(deck)
      .then(data => {
        if (data.deckId) {
          navigate('/');
        }
      })
      .catch(err => {
        setErrors(err);
      });
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