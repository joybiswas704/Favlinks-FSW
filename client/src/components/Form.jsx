import { useState } from 'react';

function Form({ handleSubmit }) {
     const [name, setName] = useState('');
     const [URL, setURL] = useState('');

     function handleChangeName(event) {
          setName(event.target.value);
     }

     function handleChangeURL(event) {
          setURL(event.target.value);
     }

     function submitForm(event) {
          event.preventDefault();
          handleSubmit({ name: name, URL: URL });
     }
     return (
          <form className='row g-3 '>
               <div className='mb-3'>
                    <label htmlFor='linkName' className='form-label'>
                         Name:
                    </label>
                    <input
                         type='text'
                         id='linkName'
                         name='linkName'
                         onChange={handleChangeName}
                         className='form-control'
                    />
               </div>

               <br />
               <br />
               <div className='mb-3'>
                    <label htmlFor='linkURL' className='form-label'>
                         URL:
                    </label>
                    <input
                         type='text'
                         id='linkURL'
                         name='linkURL'
                         onChange={handleChangeURL}
                         className='form-control'
                    />
               </div>

               <br />
               <br />
               <input
                    type='submit'
                    className='btn btn-primary'
                    value='Submit'
                    onClick={submitForm}
               ></input>
          </form>
     );
}

export default Form;
