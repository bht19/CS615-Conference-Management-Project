import React, { useContext } from 'react';
import Items from './Items';
import { AppContext } from '../context/AppContext';

const PapersList = () => {
    const { papers } = useContext(AppContext);

    return (
        <table className='table'>
            <thead className="thead-light">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Authors</th>
              <th scope="col">Keywords</th>
              <th scope="col">Abstract</th>
              <th scope="col">Attachment</th>
              <th scope="col">Submitted</th>
            </tr>
          </thead>
            <tbody>
            {papers.map((paper) => (
                <Items key={paper.id} id={paper.id} title={paper.title} 
                authors={paper.authors} keywords={paper.keywords} abstract={paper.abstract}
                attachment={paper.attachment} submittedby={paper.submittedby}/>
            ))}
            </tbody>
        </table>
    );
};

export default PapersList;
