import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function TableHeader() {
     /* responsible for rendering the head of our table with the appropriate columns */
     return (
          <thead>
               <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Remove</th>
                    <th>Edit</th>
               </tr>
          </thead>
     );
}

const TableBody = (props) => {
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
     const [name, setName] = useState('');
     const [url, setUrl] = useState('');

     function handleChangeName(event) {
          setName(event.target.value);
     }

     function handleChangeURL(event) {
          setUrl(event.target.value);
     }

     function submitModal(id) {
          handleClose();
          props.editLink(id, { name: name, url: url });
     }

     const rows = props.linkData.map((row, index) => {
          return (
               <>
                    <tr key={index}>
                         <td>{row.name}</td>
                         <td>
                              <a
                                   href={row.url}
                                   style={{ textDecoration: 'none' }}
                              >
                                   {row.url}
                              </a>
                         </td>
                         <td>
                              <button
                                   onClick={() => props.removeLink(row.id)}
                                   className='btn btn-danger'
                              >
                                   Delete
                              </button>
                         </td>
                         <td>
                              <>
                                   <Button
                                        variant='primary'
                                        onClick={handleShow}
                                   >
                                        Edit
                                   </Button>

                                   <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                             <Modal.Title>
                                                  Edit fav link
                                             </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                             <Form>
                                                  <Form.Group
                                                       className='mb-3'
                                                       controlId='exampleForm.ControlInput1'
                                                  >
                                                       <Form.Label>
                                                            Name
                                                       </Form.Label>
                                                       <Form.Control
                                                            type='input'
                                                            autoFocus
                                                            onChange={
                                                                 handleChangeName
                                                            }
                                                       />
                                                  </Form.Group>
                                                  <Form.Group
                                                       className='mb-3'
                                                       controlId='exampleForm.ControlInput1'
                                                  >
                                                       <Form.Label>
                                                            URL
                                                       </Form.Label>
                                                       <Form.Control
                                                            as='input'
                                                            rows={3}
                                                            onChange={
                                                                 handleChangeURL
                                                            }
                                                       />
                                                  </Form.Group>
                                             </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                             <Button
                                                  variant='secondary'
                                                  onClick={handleClose}
                                             >
                                                  Close
                                             </Button>
                                             <Button
                                                  variant='primary'
                                                  onClick={() =>
                                                       submitModal(row.id)
                                                  }
                                             >
                                                  Save Changes
                                             </Button>
                                        </Modal.Footer>
                                   </Modal>
                              </>
                         </td>
                    </tr>
               </>
          );
     });

     return <tbody>{rows}</tbody>;
};

function Table({ linkData, removeLink, editLink }) {
     return (
          <>
               <table className='table'>
                    <TableHeader />
                    <TableBody
                         linkData={linkData}
                         removeLink={removeLink}
                         editLink={editLink}
                    />
               </table>
          </>
     );
}

export default Table;
