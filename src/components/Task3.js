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
        console.log("Paper ID:", paper.id);
      obj[paper.id] = {
        _id: paper.id,
        title: paper.name, // Mapping 'name' to 'title'
        authors: paper.author, // Mapping 'author' to 'authors'
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

  const onSubmitData = async () => {
    let response; // Define response variable outside try block
  
    try {
        const papersToUpdate = Object.values(papersObj).map(paper => ({
            _id: paper._id,
            rev1: paper.rev1,
            rev2: paper.rev2,
            rev3: paper.rev3
          }));
      
          console.log("Papers to update:", papersToUpdate);
  
      response = await fetch('http://localhost:3001/api/papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ papers: papersToUpdate })  // Ensure format matches backend expectation
      });
  
      if (response.ok) {
        const result = await response.json(); // Move this line inside if condition
        console.log('Data saved successfully:', result);
        // Handle any post-save actions here, like updating the UI or state
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      console.log('Response text:', await response?.text()); // Use optional chaining
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
            key={paper._id}  // Changed key to 'title' since it is the unique field
              paper={paper}
              paperName={paper.title}
              paperAuthor={paper.authors}
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
