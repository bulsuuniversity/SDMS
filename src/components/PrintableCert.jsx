import React from "react";
import { useState } from "react";

const PrintableCert = React.forwardRef((content, ref) => {
    const [studentName, setStudentName] = useState('');
    const [disciplinaryAction, setDisciplinaryAction] = useState('');
    const [agreementText, setAgreementText] = useState('');
    
    return (
        <div className='w-full h-full p-10'>
            <h1>Student Discipline Agreement</h1>
            <form onSubmit={handleSubmit}>
                <div ref={ref}>
                    <label>
                        Student Name:
                        <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Disciplinary Action Taken:
                        <input type="text" value={disciplinaryAction} onChange={(e) => setDisciplinaryAction(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Agreement Text:
                        <textarea value={agreementText} onChange={(e) => setAgreementText(e.target.value)} />
                    </label>
                    <br />
                </div>
                {/* <button type="submit">Submit Agreement</button> */}
            </form>
        </div>
    );
});

export default PrintableCert;
