import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import CriminalsForm from './Form';

class CriminalsEdit extends React.Component {

  state = {
    selectedOptions: [],
    errors: {},
    criminal: {}
  };

  handleChange = ({ target: { name, value }}) => {
    const criminal = { ...this.state.criminal, [name]: value };
    const errors = { ...this.state.errors, [name]: '' };
    this.setState({ criminal, errors });
  }

  handleSelectChange = selectedOptions => {
    const associateIds = selectedOptions.map(option => option.value);
    const criminal = { ...this.state.criminal, associate_ids: associateIds };
    this.setState({ selectedOptions, criminal });
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


        this.setState({ options, selectedOptions, criminal }, () => console.log(this.state));
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`/api/criminals/${this.props.match.params.id}`, this.state.criminal, {
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
        options={this.state.options}
        selectedOptions={this.state.selectedOptions}
        data={this.state.criminal}
        errors={this.state.errors}
      />
    );
  }
}

export default CriminalsEdit;
