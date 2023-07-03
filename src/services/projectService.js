
export async function findAll() {
  return await window.api.getProjects();
}

export async function findById(id) {
  return await window.api.getProjectById(id);
}

export async function add(project) {
  const errors = await validate(project);
  if (errors && errors.length > 0) {
    return Promise.reject(errors);
  }
  return window.api.addProject(project);
}

const validate = async (project) => {
  const errors = [];

  if (!project.name) {
    errors.push('Name is required.');
    return errors;
  }

  const projects = await findAll();
  if (projects.findIndex(p => p.name === project.name && p.projectId !== project.projectId) > -1) {
    errors.push(`Project name '${project.name}' is already in use.`);
    return errors;
  }
};