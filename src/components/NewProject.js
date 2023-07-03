import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import { add } from '../services/projectService';

function NewProject() {

  const navigate = useNavigate();

  const [projectAttributes, setProjectAttributes] = useState({
    name: ''
  });

  const fields = [
    {
      name: 'name',
      label: 'Project name',
      type: 'text'
    }
  ];

  const handleSubmit = (nextAttributes, setErrors) => {
    add(nextAttributes)
      .then(data => {
        if (data.projectId) {
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
      values={projectAttributes}
      onSubmit={handleSubmit}
      submitButtonText="Next" />
  }
}

export default NewProject;