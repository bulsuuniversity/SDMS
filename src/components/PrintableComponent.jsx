import React from "react";

const PrintableComponent = React.forwardRef((content, ref) => {
  const header = ["NUMBER", "ID NUMBER", "EMAIL", "NAME", "STATUS"]
  return (
    <div ref={ref}>
      <div className="m-10">
        <table>
          <tr>
            {header && header.map((header) => <th key={header}>{header}</th>)}
          </tr>
          {content && content.map((student, index) =>
            <tr key={index}>
              <td className="text-center" key={index}>{index}</td>
              <td className="text-center" key={student.idNumber}>{student.idNumber}</td>
              <td className="text-center" key={student.email}>{student.email}</td>
              <td className="text-center" key={student.name}>{student.name}</td>
              <td className="text-center" key={student.status}>{student.status}</td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
});

export default PrintableComponent;
