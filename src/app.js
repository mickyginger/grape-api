import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import CriminalsIndex from './components/criminals/Index';
import CriminalsShow from './components/criminals/Show';
import CriminalsNew from './components/criminals/New';
import CriminalsEdit from './components/criminals/Edit';
import AuthLogin from './components/auth/Login';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import FlashMessages from './components/common/FlashMessages';

import 'bulma';
import 'react-select/dist/react-select.css';
import './scss/style.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <FlashMessages />
          <Route exact path="/" component={Home} />
          <section className="section">
            <div className="container">
              <Switch>
                <ProtectedRoute path="/criminals/new" component={CriminalsNew} />
                <ProtectedRoute path="/criminals/:id/edit" component={CriminalsEdit} />
                <Route path="/criminals/:id" component={CriminalsShow} />
                <Route path="/criminals" component={CriminalsIndex} />
                <Route path="/login" component={AuthLogin} />
                <Route exact path="/" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
