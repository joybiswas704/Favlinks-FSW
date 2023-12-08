function TableHeader() {
     /* responsible for rendering the head of our table with the appropriate columns */
     return (
          <thead>
               <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Remove</th>
               </tr>
          </thead>
     );
}

const TableBody = (props) => {
     // boilerplate table body functional component
     // we use Array.map to create table rows from LinkData passed via props
     const rows = props.linkData.map((row, index) => {
          return (
               <tr key={index}>
                    <td>{row.name}</td>
                    <td>
                         <a href={row.url} style={{ textDecoration: 'none' }}>
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
               </tr>
          );
     });

     return <tbody>{rows}</tbody>;
};

function Table({ linkData, removeLink }) {
     return (
          <table className='table'>
               <TableHeader />
               <TableBody linkData={linkData} removeLink={removeLink} />
          </table>
     );
}

export default Table;
