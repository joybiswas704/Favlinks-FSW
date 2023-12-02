import Table from './Table';
import Form from './Form';
import { useState } from 'react';

function LinkContainer() {
     const [favLinks, setFavLinks] = useState([]);
     const handleRemove = (index) => {
          /*
                TODO - Create logic for setting the state to filter array and remove favLink at index
            */

          setFavLinks(
               favLinks.filter((favLink, i) => {
                    if (i != index) {
                         return favLink;
                    }
               })
          );
     };

     const handleSubmit = (favLink) => {
          /*
                TODO - Create logic to set state and add new favLink to favLinks array in state
            */

          setFavLinks([...favLinks, favLink]);
     };

     return (
          <div className='container'>
               <h1>My Favorite Link</h1>
               <p>Add a new link with a name and URL to the table! </p>
               <Table linkData={favLinks} removeLink={handleRemove} />
               <h1>Add New</h1>
               <Form handleSubmit={handleSubmit} />
          </div>
     );
}
export default LinkContainer;
