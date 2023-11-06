import Image from "next/image";
import React from "react";
import { useSession } from 'next-auth/react';


const PrintableComponent = React.forwardRef(({ college, yearLevel, content }, ref) => {

  const { data: session } = useSession();
  const header = ["NUM", "ID NUMBER", "EMAIL", "NAME", "STATUS"]

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const slashFormattedDate = `${day}/${month}/${year}`;

  return (
    <div ref={ref}>
      <div className="w-full">
        <Image width={1500} className="w-full" layout="responsive" height={500} src={"/HEADER.png"} alt="header" />
        <div className="w-full h-max flex justify-center items-center gap-6">
          <Image className="w-max h-max" width={44} height={44} src={"/Logo.png"} alt="Logo" />
          <div className="grid my-6">
            <p className="font-semibold text-center">Bulacan State University</p>
            <p className="font-semibold text-center">Discipline Committee</p>
            <p className="italic text-center">Bustos Campus, Bustos, Bulacan</p>
          </div>
        </div>
        <div className="bg-black text-white h-max w-full flex justify-center">
          <p>Student Records</p>
        </div>
        <div className="m-10">
          <table className="w-full justify-center">
            <tr>
              {header && header.map((header) => <th className="border" key={header}>{header}</th>)}
            </tr>
            {content && content.map((student, index) =>
              <tr key={index}>
                <td className="border px-2 text-center" key={index}>{index + 1}</td>
                <td className="border px-2 text-center" key={student.idNumber}>{student.idNumber}</td>
                <td className="border px-2 text-center" key={student.email}>{student.email}</td>
                <td className="border px-2 text-center" key={student.name}>{student.name}</td>
                <td className="border px-2 text-center" key={student.status}>{student.status}</td>
              </tr>
            )}
          </table>
        </div>
        <div className="grid bottom-0 justify-center mb-10 gap-4">
          <h2 className="text-center">Records Details:</h2>
          <div className="flex">
            {!yearLevel && !college && <p className="text-center w-full flex justify-center">All Student</p>}
            {college && <p className="text-center w-full flex justify-center">College: {college}</p>}
            {yearLevel && <p className="text-center w-full flex justify-center">Year Level:{yearLevel}</p>}
          </div>
          <p className="text-center">As of: {slashFormattedDate}</p>
          <div className="grid">
            <p className="text-center">Printed by:</p>
            <p className="underline underline-offset-8 text-center pt-8">{session && session.name}</p>
            <p className="italic pt-2 text-xs text-center">Signature Over Printed Name</p>
          </div>
          <div className="grid w-full justify-center">
            <p className="text-center">Approved By:</p>
            <p className="underline underline-offset-8 text-center pt-8">DR. EDITHA N. DE REGLA</p>
            <p className="italic pt-2 text-xs text-center">Signature Over Printed Name</p>
          </div>
        </div>
        {/* <Image width={1500} className="w-full" layout="responsive" height={500} src={"/HEADER.png"} alt="header" /> */}
      </div>
    </div>
  );
});

export default PrintableComponent;
