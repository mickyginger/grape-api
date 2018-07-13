import React from 'react';
import Select from 'react-select';

const CriminalsForm = ({ handleSelectChange, handleChange, handleSubmit, data, errors, options, selectedOptions }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Name</label>
        <input className="input" name="name" placeholder="Name" onChange={handleChange} value={data.name || ''}/>
        {errors.name && <small>{errors.name}</small>}
      </div>
      <div className="field">
        <label className="label">Date of Birth</label>
        <input className="input" type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} value={data.dob || ''} />
        {errors.dob && <small>{errors.dob}</small>}
      </div>
      <div className="field">
        <label className="label">Status</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select name="status" onChange={handleChange} value={data.status || ''}>
              <option value="" disabled>Please choose</option>
              <option>At large</option>
              <option>Incarcerated</option>
              <option>Deceased</option>
            </select>
          </div>
        </div>
        {errors.status && <small>{errors.status}</small>}
      </div>
      <div className="field">
        <label className="label">Image</label>
        <input className="input" name="image" placeholder="Image" onChange={handleChange} value={data.image || ''}/>
        {errors.image && <small>{errors.image}</small>}
      </div>

      <div className="field">
        <label className="label">Known Associates</label>
        <Select
          multi
          name="crimes"
          value={selectedOptions}
          onChange={handleSelectChange}
          options={options}
        />
      </div>

      <button className="button">Submit</button>
    </form>
  );
};

export default CriminalsForm;
