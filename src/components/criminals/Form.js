import React from 'react';
import Select from 'react-select';

const CriminalsForm = ({ handleSelectChange, handleChange, handleSubmit, data }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Name</label>
        <input className="input" name="name" placeholder="Name" onChange={handleChange} value={data.name || ''}/>
        {data.errors.name && <small>{data.errors.name}</small>}
      </div>
      <div className="field">
        <label className="label">Date of Birth</label>
        <input className="input" type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} value={data.dob || ''} />
        {data.errors.dob && <small>{data.errors.dob}</small>}
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
        {data.errors.status && <small>{data.errors.status}</small>}
      </div>
      <div className="field">
        <label className="label">Image</label>
        <input className="input" name="image" placeholder="Image" onChange={handleChange} value={data.image || ''}/>
        {data.errors.image && <small>{data.errors.image}</small>}
      </div>

      <div className="field">
        <label className="label">Known Associates</label>
        <Select
          multi
          name="crimes"
          value={data.selectedOptions}
          onChange={handleSelectChange}
          options={data.options}
        />
      </div>

      <button className="button">Submit</button>
    </form>
  );
};

export default CriminalsForm;
