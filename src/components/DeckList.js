import { useEffect, useState } from 'react';

function DeckList() {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const nextDecks = await window.api.getDecks();
      setDecks(nextDecks);
    }

    fetchData();
  }, []);

  return <>
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
        </tr>
      </thead>
      <tbody>
        {decks.map(d => <tr key={d.deckId}>
          <td className="border px-4 py-2">{d.name}</td>
        </tr>)}
      </tbody>
    </table>
  </>
}

export default DeckList;