import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from "../services/projectService";
import DeckList from './DeckList';

function ProjectDetail() {

  const { id } = useParams();

  const [project, setProject] = useState({ name: '', decks: [] });

  useEffect(() => {
    async function fetchData() {
      if (id) {
        findById(id)
          .then(data => {
            console.log(data)
            setProject(data)
          })
          .catch(err => console.log(err));
      }
    }

    fetchData();
  }, [id]);


  return <>
    <h2>{project.name} Details</h2>
    <DeckList decks={project.decks} />
  </>;

}

export default ProjectDetail;