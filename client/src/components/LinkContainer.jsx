import Table from './Table';
import Form from './Form';
import { useState, useEffect } from 'react';

function LinkContainer() {
     const [favLinks, setFavLinks] = useState([]);

     useEffect(() => {
          getLinks();
     }, []);

     const getLinks = async () => {
          try {
               // make a request to our server to get the links
               const response = await fetch('http://localhost:3000/api/links');
               // convert the response to json
               const data = await response.json();
               setFavLinks(data);
          } catch (error) {
               console.error(error);
          }
     };

     const deleteLink = async (id) => {
          try {
               console.log('delete clicked');
               const response = await fetch(
                    `http://localhost:3000/api/links/${id}`,
                    {
                         method: 'DELETE',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    }
               );
               getLinks();
          } catch (error) {
               console.error(error);
          }
     };

     const createLink = async (favLink) => {
          try {
               const response = await fetch(`http://localhost:3000/api/links`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(favLink),
               });
               getLinks();
          } catch (error) {
               console.error(error);
          }
     };

     const handleEdit = async (id, favLink) => {
          try {
               const response = await fetch(
                    `http://localhost:3000/api/links/${id}`,
                    {
                         method: 'PUT',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify(favLink),
                    }
               );
               getLinks();
          } catch (error) {
               console.error(error);
          }
     };

     const handleRemove = (index) => {
          deleteLink(index);
     };

     const handleSubmit = (favLink) => {
          createLink(favLink);
     };

     return (
          <div className='container'>
               <h1>My Favorite Link</h1>
               <p>Add a new link with a name and URL to the table! </p>
               <Table
                    linkData={favLinks}
                    removeLink={handleRemove}
                    editLink={handleEdit}
               />
               <h1>Add New</h1>
               <Form handleSubmit={handleSubmit} />
          </div>
     );
}
export default LinkContainer;
