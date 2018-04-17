import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

const LangForm = (props: any) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit} className="form-group">

      <div>
        <label><strong>Language</strong></label>
        <div>
          <label className="control-label">
            <Field name="lang" component="input" type="radio" value="es-ES" className="form-control" />
            Español
          </label>
          < br />
          <label className="control-label">
            <Field name="lang" component="input" type="radio" value="en-US" className="form-control" />
            English
          </label>
          < br />
          <label className="control-label">
            <Field name="lang" component="input" type="radio" value="fr-FR" className="form-control" />
            Francaise
          </label>
        </div>
      </div>

      <div>
        <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Ok</button>
        <br />

      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple',
  initialValues: {
    lang:"en-US"
  } // a unique identifier for this form
})(LangForm);