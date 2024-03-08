import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Mapa } from './layouts/Mapa';

export const App = () => {
  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
          <div className='flex-grow-1'>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/home"/>
              </Route>
              <Route path="/home">
                <Mapa/>
              </Route>
            </Switch>
          </div>
      </div>
    </>
  );
}

