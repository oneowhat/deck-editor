export async function add(deck) {
  const errors = await validate(deck);
  if (errors && errors.length > 0) {
    return Promise.reject(errors);
  }
  return window.api.addDeck(deck);
}

const validate = async (deck) => {
  const errors = [];

  if (!deck.name) {
    errors.push('Name is required.');
  }

  if (deck.columnCount < 1 || deck.columnCount > 10) {
    errors.push('Column count must be between 1 - 10.')
  }

  if (deck.rowCount < 1 || deck.rowCount > 7) {
    errors.push('Row count must be between 1 - 7.')
  }

  if (errors.length > 0) {
    return errors;
  }

  const decks = await window.api.getDecks();
  if (decks.findIndex(d => isDuplicate(deck, d)) > -1) {
    errors.push(`Deck name '${deck.name}' is already in use for this project.`);
    return errors;
  }
}

const isDuplicate = (deck, existingDeck) => 
  existingDeck.name === deck.name 
  && existingDeck.projectId === deck.projectId 
  && existingDeck.deckId !== deck.deckId;