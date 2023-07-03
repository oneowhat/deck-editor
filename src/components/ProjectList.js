import { useEffect, useState } from 'react';
import { findAll } from '../services/projectService';
import { Link } from 'react-router-dom';

function ProjectList() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const nextProjects = await findAll();
      setProjects(nextProjects);
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
        {projects.map(d => <tr key={d.projectId}>
          <td className="border px-4 py-2">
            <Link to={`/project/${d.projectId}`}>{d.name}</Link>
          </td>
        </tr>)}
      </tbody>
    </table>
  </>
}

export default ProjectList;