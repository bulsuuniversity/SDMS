import React from "react";

const PrintableComponent = React.forwardRef(({ content }, ref) => {
  const header = ["NUMBER", "ID NUMBER", "EMAIL", "NAME", "STATUS"]

  const handleGetData = async () => {
    startLoading()
    try {
      const response = await axios.get(`${url}/api/studentAccount`, { headers });
      setFilterData(response.data)
      stopLoading()
    } catch (err) {
      console.log(err);
      stopLoading()
    }
  }

  const data = filterData &&
    Object.values(filterData).filter(report => {
      const searchCondition = search ?
        report.name && (report.name.toLowerCase()).includes(search.toLowerCase()) : true;
      const yearLevelCondition = !yearLevel || report && report.yearLevel && report.yearLevel.includes(yearLevel);
      const collegeCondition = !college || report && report.college === college;
      return collegeCondition && yearLevelCondition && searchCondition;
    });

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
