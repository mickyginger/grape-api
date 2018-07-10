import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import GoogleMap from '../common/GoogleMap';

class CriminalsShow extends React.Component {

  state = {
    criminal: {}
  }

  componentDidMount() {
    axios.get(`/api/criminals/${this.props.match.params.id}`)
      .then(res => this.setState({ criminal: res.data }))
      .catch(err => this.setState({ error: err.message }));
  }

  handleDelete = () => {
    axios.delete(`/api/criminals/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/criminals'));
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-half">
          <figure className="image">
            <img src={this.state.criminal.image} />
          </figure>
        </div>
        <div className="column is-half">
          <h2 className="title">{this.state.criminal.name}</h2>
          <hr />

          <h3 className="title">Last Known Location</h3>
          {this.state.criminal.last_known_location && <GoogleMap location={this.state.criminal.last_known_location} />}
          <hr/>

          <h3 className="title">Crimes</h3>
          <ul>
            {this.state.criminal.crimes && this.state.criminal.crimes.map(crime =>
              <li key={crime}>{crime}</li>
            )}
          </ul>
          <hr />

          <h3 className="title">Known Associates</h3>
          <ul>
            {this.state.criminal.associates && this.state.criminal.associates.map(associate =>
              <li key={associate.id}>{associate.name}</li>
            )}
          </ul>
          <hr />

          <Link className="button" to={`/criminals/${this.state.criminal.id}/edit`}>Edit</Link>
          <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

export default CriminalsShow;
