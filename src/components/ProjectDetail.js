import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from "../services/projectService";

function ProjectDetail() {

  const { id } = useParams();

  const [project, setProject] = useState({ name: '', decks: [] });

  useEffect(() => {
    async function fetchData() {
      if (id) {
        findById(id)
          .then(data => setProject(data))
          .catch(err => console.log(err));
      }
    }

    fetchData();
  }, [id]);

}

export default ProjectDetail;