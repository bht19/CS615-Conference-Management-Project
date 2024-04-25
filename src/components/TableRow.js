import { useState } from "react";

const TableRow = ({
  paper,
  paperName,
  reviewers,
  setReviewers,
  setPapersObj,
  key,
}) => {
  const [rev1, setRev1] = useState(paper.rev1);
  const [rev2, setRev2] = useState(paper.rev2);
  const [rev3, setRev3] = useState(paper.rev3);

  const handleReviewerChange = (paperName, revType, e) => {
    const { value } = e.target;
    let prevValue;

    if (!value || reviewers[value].availableSlots > 0) {
      if (revType === "rev1") {
        prevValue = rev1;
        setRev1(value);
      } else if (revType === "rev2") {
        prevValue = rev2;
        setRev2(value);
      } else {
        prevValue = rev3;
        setRev3(value);
      }

      if (prevValue && value) {
        setReviewers((prevState) => ({
          ...prevState,
          [value]: {
            assigned: reviewers[value].assigned + 1,
            availableSlots: reviewers[value]?.availableSlots - 1,
          },
          [prevValue]: {
            assigned: reviewers[prevValue]?.assigned - 1,
            availableSlots: reviewers[prevValue]?.availableSlots + 1,
          },
        }));

        setPapersObj((prevState) => ({
          ...prevState,
          [paperName]: {
            ...paper,
            [revType]: value,
          },
        }));
      } else if (prevValue && !value) {
        setReviewers((prevState) => ({
          ...prevState,
          [prevValue]: {
            assigned: reviewers[prevValue]?.assigned - 1,
            availableSlots: reviewers[prevValue]?.availableSlots + 1,
          },
        }));
        setPapersObj((prevState) => ({
          ...prevState,
          [paperName]: {
            ...paper,
            [revType]: "",
          },
        }));
      } else {
        setReviewers((prevState) => ({
          ...prevState,
          [value]: {
            assigned: reviewers[value]?.assigned + 1,
            availableSlots: reviewers[value]?.availableSlots - 1,
          },
        }));

        setPapersObj((prevState) => ({
          ...prevState,
          [paperName]: {
            ...paper,
            [revType]: value,
          },
        }));
      }
    } else {
      alert("No available slots ");
    }
  };

  const generateReviewerCell = (revType, revValue) => {
    return (
      <select
        value={revValue || ""}
        onChange={(e) => {
          handleReviewerChange(paperName, revType, e);
        }}
      >
        <option value="">Select Reviewer</option>

        {Object.keys(reviewers).map((reviewer, index) => {
          let chkFlag = true;

          if (revType === "rev1") {
            chkFlag = rev2 !== reviewer && rev3 !== reviewer;
          } else if (revType === "rev2") {
            chkFlag = rev1 !== reviewer && rev3 !== reviewer;
          } else {
            chkFlag = rev1 !== reviewer && rev2 !== reviewer;
          }

          if (chkFlag) {
            return (
              <option key={index} value={reviewer}>
                {`${reviewer} (${reviewers[reviewer].availableSlots})`}
              </option>
            );
          }
        })}
      </select>
    );
  };

  return (
    <tr key={key}>
      <td>{paperName}</td>
      <td>{paper.authors}</td>
      <td key="rev1">{generateReviewerCell("rev1", rev1)}</td>
      <td key="rev2">{generateReviewerCell("rev2", rev2)}</td>
      <td key="rev3">{generateReviewerCell("rev3", rev3)}</td>
    </tr>
  );
};

export default TableRow;
