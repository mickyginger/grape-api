import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class CriminalsIndex extends React.Component {

  constructor() {
    super();
    this.state = {
      criminals: [],
      sort: 'name|asc'
    };
  }

  componentDidMount() {
    axios.get('/api/criminals')
      .then(res => this.setState({ criminals: res.data }));
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  }

  filteredCriminals = (criminals) => {
    const re = new RegExp(this.state.search, 'i');
    return criminals.filter(criminal => {
      return re.test(criminal.name) || re.test(criminal.crimes);
    });
  }

  handleSort = (e) => {
    this.setState({ sort: e.target.value });
  }

  sortedCriminals = (criminals) => {
    const [ prop, dir ] = this.state.sort.split('|');
    return _.orderBy(criminals, prop, dir);
  }

  sortedAndFilteredCriminals = () => {
    const filtered = this.filteredCriminals(this.state.criminals);
    return this.sortedCriminals(filtered);
  }

  render() {
    return (
      <section>

        <div className="filters">
          <input className="input" placeholder="Search" onChange={this.handleSearch} />

          <div className="control">
            <div className="select is-fullwidth">
              <select onChange={this.handleSort}>
                <option value="name|asc">Name (A-Z)</option>
                <option value="name|desc">Name (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="columns is-multiline">
          {this.sortedAndFilteredCriminals().map(criminal =>
            <div key={criminal.id} className="column is-one-third-desktop is-half-tablet">
              <Link to={`/criminals/${criminal.id}`}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image">
                      <img src={criminal.image} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content">
                      <h2 className="title">{criminal.name}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default CriminalsIndex;
