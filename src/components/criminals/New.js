import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import CriminalsForm from './Form';

class CriminalsNew extends React.Component {

  state = {
    options: [],
    selectedOptions: [],
    errors: {},
    criminal: {}
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
    const criminal = { ...this.state.criminal, [name]: value };
    this.setState({ criminal });
  }

  handleSelectChange = selectedOptions => {
    const knownAssociates = selectedOptions.map(option => option.value);
    this.setState({ selectedOptions, knownAssociates }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/criminals', this.state.criminal, {
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
        options={this.state.options}
        selectedOptions={this.state.selectedOptions}
        data={this.state.criminal}
        errors={this.state.errors}
      />
    );
  }
}

export default CriminalsNew;
