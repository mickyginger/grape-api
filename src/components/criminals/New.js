import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import CriminalsForm from './Form';

class CriminalsNew extends React.Component {

  state = {
    selectedOptions: [],
    errors: {}
  };

  componentDidMount() {
    axios.get('/api/criminals')
      .then(res => {
        const options = res.data.map(criminal => {
          return { value: criminal.id, label: criminal.name };
        });

        this.setState({ options });
      });
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSelectChange = selectedOptions => {
    const knownAssociates = selectedOptions.map(option => option.value);
    this.setState({ selectedOptions, knownAssociates }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios('/api/criminals', this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/criminals'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <CriminalsForm
        handleSelectChange={this.handleSelectChange}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        data={this.state}
      />
    );
  }
}

export default CriminalsNew;
