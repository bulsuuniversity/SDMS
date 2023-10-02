import DataTable from 'react-data-table-component';
import SendMessage from '@/components/SendMessage';
import { AiOutlineMail } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const StudentRecordDatagridview = ({ tableData, setClickedID, setOpenINfo }) => {

    const [openMessage, setOpenMessage] = useState(false)
    const [sentEmail, setSentEmail] = useState()
    const [studentEmail, setStudentEmail] = useState()

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const formattedDate = tomorrow.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const suggestions = {
        one: `Good day! We request you to please attend the meeting on ${formattedDate} in Room 216B (9:00AM). Your attendance is a must for the proceeding of your ongoing case. Further details will be discussed on the said meeting. Thank you.`,
    }


    const columns = [
        {
            name: <div className='flex text-center'>STUDENT ID</div>,
            selector: row => row.idNumber,
            sortable: true,
            cell: (row) => <div onClick={() => handleRowClick(row)} style={{ whiteSpace: 'normal' }}>{row.idNumber}</div>,
        },
        {
            name: <div className='flex text-center'>EMAIL</div>,
            selector: row => row.email,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.email}</div>,
        },
        {
            name: <div className='flex text-center'>NAME</div>,
            selector: row => row.name,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.name}</div>,
        },
        {
            name: <div className='flex text-center'>COLLEGE</div>,
            selector: row => row.college,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.college}</div>,
        },
        {
            name: <div className='flex text-center'>YEAR LEVEL</div>,
            selector: row => row.yearLevel,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.yearLevel}</div>,
        },
        {
            name: <div className='flex text-center'>STATUS</div>,
            selector: row => row.status,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.status}</div>,
            conditionalCellStyles: [
                {
                    when: (row) => row.status === "Unregistered",
                    style: {
                        color: 'red',
                    },
                },
                {
                    when: (row) => row.status === "Registered",
                    style: {
                        color: 'green',
                    },
                },
            ],
        },
        {
            name: <div className='flex text-center'>MESSAGE</div>,
            sortable: true,
            cell: (row) => <div className='flex justify-center w-full' onClick={() => handleSendMessage(row)}><AiOutlineMail size={20} /></div>,
        },
    ];
    const data = Object.values(tableData).map((account, index) => ({
        id: account.id,
        idNumber: account.idNumber,
        email: account.email,
        name: account.name,
        college: account.college,
        yearLevel: account.yearLevel,
        status: account.status,
    }))

    const handleRowClick = (row) => {
        setClickedID(row.id)
        setOpenINfo(true)
    };

    const handleSendMessage = (row) => {
        setStudentEmail(row.email)
        setOpenMessage(true)
    };

    // useEffect(() => {
    //     if (studentEmail) {
    //         setOpenMessage(true)
    //     }
    // }, [studentEmail])

    const customStyles = {
        rows: {
            style: {
                cursor: 'pointer',
            },
        },
        headCells: {
            style: {
                backgroundColor: "#a11818",
                color: "#ffff"
            },
        },
    };

    return (
        <>
            {openMessage &&
                <SendMessage suggestions={suggestions}
                    sentEmail={sentEmail}
                    setSentEmail={setSentEmail}
                    email={studentEmail}
                    setClose={setOpenMessage} />}
            <DataTable
                fixedHeader
                fixedHeaderScrollHeight="500px"
                customStyles={customStyles}
                onRowClicked={handleRowClick}
                columns={columns}
                data={data}
                pagination={tableData.length > 10}
                responsive

            />
        </>


    );
}

export default StudentRecordDatagridview;