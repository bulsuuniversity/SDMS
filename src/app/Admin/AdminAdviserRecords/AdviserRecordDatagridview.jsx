import DataTable from 'react-data-table-component';
import SendMessage from '@/components/SendMessage';
import { AiOutlineMail } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const AdviserRecordDatagridview = ({ tableData, setClickedID, setOpenINfo }) => {

    const [openMessage, setOpenMessage] = useState(false)
    const [sentEmail, setSentEmail] = useState()
    const [adviserEmail, setAdviserEmail] = useState()

    const suggestions = {
        one: `Good day! This is to inform you that your one of your student has been reported.`,
    }


    const columns = [
        {
            name: <div className='flex text-center'>ADVISER EMAIL</div>,
            selector: row => row.adviserEmail,
            sortable: true,
            cell: (row) => <div onClick={() => handleRowClick(row)} style={{ whiteSpace: 'normal' }}>{row.adviserEmail}</div>,
        },
        {
            name: <div className='flex text-center'>ADVISER NAME</div>,
            selector: row => row.adviserName,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.adviserName}</div>,
        },
        {
            name: <div className='flex text-center'>MESSAGE</div>,
            sortable: true,
            cell: (row) => <div className='flex justify-center w-full' onClick={() => handleSendMessage(row.adviserEmail)}><AiOutlineMail size={20} /></div>,
        },
    ];
    const data = Object.values(tableData).map((account, index) => ({
        id: account.id,
        adviserEmail: account.adviserEmail,
        adviserName: account.adviserName,
    }))

    const handleRowClick = (row) => {
        setClickedID(row.id)
        setOpenINfo(true)
    };

    const handleSendMessage = (row) => {
        setAdviserEmail(row)
        { adviserEmail && setOpenMessage(true) }
        console.log(adviserEmail)
    };

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
                    email={adviserEmail}
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

export default AdviserRecordDatagridview;