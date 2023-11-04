import Image from "next/image";
import React from "react";
import { useSession } from 'next-auth/react';


const PrintableComponent = React.forwardRef(({ college, yearLevel, content }, ref) => {

  const { data: session } = useSession();
  const header = ["NUMBER", "ID NUMBER", "EMAIL", "NAME", "STATUS"]



  return (
    <div ref={ref}>
      <div className="w-full">
        <Image width={1500} className="w-full" layout="responsive" height={500} src={"/HEADER.png"} alt="header" />
        <div className="w-full flex justify-center gap-6">
          <Image width={1200} height={300} src={"/Logo.png"} alt="Logo" />
          <div className="grid">
            <p className="font-semibold text-center">Bulacan State University</p>
            <p className="font-semibold text-center">Discipline Committee</p>
            <p className="italic text-center">Bustos Campus, Bustos, Bulacan</p>
          </div>
        </div>
        <div className="bg-black text-white h-max w-full flex justify-center">
          <p>Student Records</p>
        </div>
        <div className="m-10">
          <table>
            <tr>
              {header && header.map((header) => <th className="border" key={header}>{header}</th>)}
            </tr>
            {content && content.map((student, index) =>
              <tr key={index}>
                <td className="border text-center" key={index}>{index + 1}</td>
                <td className="border text-center" key={student.idNumber}>{student.idNumber}</td>
                <td className="border text-center" key={student.email}>{student.email}</td>
                <td className="border text-center" key={student.name}>{student.name}</td>
                <td className="border text-center" key={student.status}>{student.status}</td>
              </tr>
            )}
          </table>
        </div>
        <div className="grid justify-center mb-10 gap-4">
          <h2>Records Details:</h2>
          <div className="flex">
            {!yearLevel && !college && <p className="text-center">All Student</p>}
            {college && <p className="text-center">{college}</p>}
            {yearLevel && <p className="text-center">{yearLevel}</p>}
          </div>
          <p className="text-center">As of: {Date.now}</p>
          <div className="grid">
            <p className="text-center">Printed by:</p>
            <p className="underline underline-offset-8 pt-8">{session && session.name}</p>
            <p className="italic text-xs">Signature Over Printed Name</p>
          </div>
          <div className="grid w-full justify-center">
            <p className="text-center">Approved By:</p>
            <p className="underline underline-offset-8 text-center pt-8">DR. EDITHA N. DE REGLA</p>
            <p className="italic text-xs text-center">Signature Over Printed Name</p>
          </div>
        </div>
        <Image width={1500} className="w-full" layout="responsive" height={500} src={"/HEADER.png"} alt="header" />
      </div>
    </div>
  );
});

export default PrintableComponent;
