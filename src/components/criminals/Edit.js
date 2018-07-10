import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import CriminalsForm from './Form';

class CriminalsEdit extends React.Component {

  state = {
    selectedOptions: [],
    errors: {}
  };

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSelectChange = selectedOptions => {
    const knownAssociates = selectedOptions.map(option => option.value);
    this.setState({ selectedOptions, knownAssociates }, () => console.log(this.state));
  }

  componentDidMount() {

    axios.get('/api/criminals')
      .then(res => {
        const options = res.data.map(criminal => {
          return { value: criminal.id, label: criminal.name };
        });

        const criminal = res.data.find(criminal => criminal.id === Number(this.props.match.params.id));
        const selectedOptions = criminal.associates.map(criminal => {
          return { value: criminal.id, label: criminal.name };
        });


        this.setState({ options, selectedOptions, ...criminal });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/criminals/${this.props.match.params.id}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/criminals'));
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

export default CriminalsEdit;
