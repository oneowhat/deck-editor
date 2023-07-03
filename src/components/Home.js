import { Link } from 'react-router-dom';
import ProjectList from './ProjectList';

function Home() {

  const handleQuit = () => {
    window.api.quitApp();
  };

  return <div className="container mx-auto">
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <button onClick={handleQuit}>Quit</button>
    <Link to="/new-project">New Project</Link>
    <ProjectList />
  </div>;
}

export default Home;