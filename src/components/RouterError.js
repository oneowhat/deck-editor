import { useRouteError } from 'react-router-dom';

function RouterError() {
  const error = useRouteError();
  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  );
}

export default RouterError;