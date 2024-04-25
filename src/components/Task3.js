import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import "./Task3.css";

const Task3 = ({ data }) => {
  const [reviewers, setReviewers] = useState({});
  const [papersObj, setPapersObj] = useState({});

  useEffect(() => {
    const countReviewerOccurrences = (reviewerName) => {
      return data.paper.reduce((count, paper) => {
        return (paper.rev1 === reviewerName || paper.rev2 === reviewerName || paper.rev3 === reviewerName)
          ? count + 1
          : count;
      }, 0);
    };

    const b = (data.paper.length * 3) % data.reviewers.length !== 0 ? 1 : 0;
    const maxr = Math.floor((data.paper.length * 3) / data.reviewers.length) + b;
    console.log("Data from server:", data);

    const revsObj = data.reviewers.reduce((obj, rev) => {
      const assignedCount = countReviewerOccurrences(rev);
      obj[rev] = { assigned: assignedCount, availableSlots: maxr - assignedCount };
      return obj;
    }, {});

    const papersObj = data.paper.reduce((obj, paper) => {
      obj[paper.name] = {
        _id: paper.id,
        title: paper.name, 
        authors: paper.author, 
        assigned: paper.assigned,
        rev1: paper.rev1 || "",
        rev2: paper.rev2 || "",
        rev3: paper.rev3 || "",
      };
      return obj;
    }, {});
    console.log("papersObj:", papersObj)

    setReviewers(revsObj);
    setPapersObj(papersObj);
    console.log("Papers object state:", papersObj); 
  }, [data]); 

  const calculateAssigned = (rev1, rev2, rev3) => {
    if (rev1 && rev2 && rev3) {
      return 1;
    } else {
      return 0;
    }
  };

  const onSubmitData = async () => {
    let response;
  
    try {
        const papersToUpdate = Object.values(papersObj).map(paper => ({
            _id: paper._id,
            rev1: paper.rev1,
            rev2: paper.rev2,
            rev3: paper.rev3,
            assigned: calculateAssigned(paper.rev1, paper.rev2, paper.rev3)
          }));
      
          console.log("Papers to update:", papersToUpdate);
  
      response = await fetch('http://localhost:3001/api/papers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ papers: papersToUpdate }) 
      });
  
      if (response.ok) {
        const result = await response.json(); 
        console.log('Data saved successfully:', result);
        alert('Reviewers updated successfully!');
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      console.log('Response text:', await response?.text());
    }
};

  return (
    <div className="TD">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Reviewer 1</th>
            <th>Reviewer 2</th>
            <th>Reviewer 3</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(papersObj).map((paper, index) => (
            <TableRow
            key={paper._id} 
              paper={paper}
              paperName={paper.title}
              reviewers={reviewers}
              setReviewers={setReviewers}
              setPapersObj={setPapersObj}
            />
          ))}
        </tbody>
      </table>
      <button className="submit_btn" onClick={onSubmitData}>
        Submit
      </button>
    </div>
  );
};

export default Task3;
