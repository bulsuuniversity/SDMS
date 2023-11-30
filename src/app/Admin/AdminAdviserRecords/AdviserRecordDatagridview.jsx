import DataTable from 'react-data-table-component';
import SendMessage from '@/components/SendMessage';
import { AiOutlineMail } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { BsFillTrash3Fill } from "react-icons/bs";
import axios from 'axios';
import { url, headers } from '@/app/libs/api';
import { PiPencilFill } from "react-icons/pi";
import InformationModal from '@/utils/InformationModal';

const AdviserRecordDatagridview = ({ tableData, handleGetData, setClickedID, setOpenINfo }) => {

    const [openMessage, setOpenMessage] = useState()
    const [sentEmail, setSentEmail] = useState()
    const [adviserEmail, setAdviserEmail] = useState()
    const [clicked, setClicked] = useState()
    const [data, setData] = useState({
        name: clicked?.name,
        email: clicked?.email,
        section: clicked?.section,
    })

    useEffect(() => {
        if (clicked) {
            handleSetData("name", clicked.name)
            handleSetData("email", clicked.email)
            handleSetData("section", clicked.section)
        }
    }, [clicked])



    const handleSetData = (name, value) => {
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${url}/api/Adviser/${clicked.id}`, { data }, { headers });
            alert("Successfully edited the Adviser!")
            handleGetData()
            setClicked()
        } catch (err) {
            console.log(err);
        }
    }

    const suggestions = {
        one: `Good day! This is to inform you that one of your students has been reported.`,
    }


    const columns = [
        {
            name: <div className='flex justify-center'>ADVISER NAME</div>,
            selector: row => row.name,
            sortable: true,
            cell: (row) => <div onClick={() => handleRowClick(row)} style={{ whiteSpace: 'normal' }}>{row.name}</div>,
        },
        {
            name: <div className='flex text-center'>ADVISER EMAIL</div>,
            selector: row => row.email,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.email}</div>,
        },
        {
            name: <div className='flex justify-center w-full'>ADVISER SECTION</div>,
            selector: row => row.section,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.section}</div>,
        },
        {
            name: <div className='flex justify-center w-full'>MESSAGE</div>,
            selector: row => row.email,
            sortable: true,
            cell: (row) => <div className='flex justify-center w-full' onClick={() => handleSendMessage(row.email)}><AiOutlineMail size={20} /></div>,
        },
        {
            name: <div className='flex justify-center w-full'>EDIT</div>,
            selector: row => row,
            sortable: true,
            cell: (row) => <div className='flex justify-center w-full' onClick={() => setClicked(row)}><PiPencilFill size={20} /></div>,
        },
        {
            name: <div className='flex justify-center w-full'><p>DELETE</p></div>,
            selector: row => row.id,
            sortable: true,
            cell: (row) => <div className='flex justify-center w-full' onClick={() => handleDelete(row.id)}><BsFillTrash3Fill size={20} /></div>,
        },
    ];


    const datas = Object.values(tableData).map((account, index) => ({
        id: account.id,
        name: account.name,
        email: account.email,
        section: account.section,
    }))

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${url}/api/Adviser/${id}`, { headers });
            alert("Successfully deleted the Adviser!")
            handleGetData()

        } catch (err) {
            console.log(err);
        }
    }


    const handleRowClick = (row) => {
        setClickedID(row.id)
        setOpenINfo(true)
    };

    const handleSendMessage = (row) => {
        setOpenMessage(row)
    };


    useEffect(() => {
        if (openMessage) {
            setAdviserEmail(openMessage)
        }
    }, [openMessage])

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
            {clicked && <InformationModal>
                <form className="border grid gap-3 border-2 p-10" onSubmit={handleEdit}>
                    <label className="flex justify-between">
                        Name:
                        <input
                            type="text"
                            className="border-black border-2 ml-2"
                            name="name"
                            value={data.name}
                            onChange={(e) => handleSetData('name', e.target.value)}
                            required
                        />
                    </label>
                    <label className="flex justify-between">
                        Email:
                        <input
                            type="email"
                            className="border-black border-2 ml-2"
                            name="email"
                            value={data.email}
                            onChange={(e) => handleSetData('email', e.target.value)}
                            required
                        />
                    </label>
                    <label className="flex justify-between">
                        Section:
                        <input
                            type="text"
                            className="border-black border-2 ml-2"
                            name="section"
                            value={data.section}
                            onChange={(e) => handleSetData('section', e.target.value)}
                            required
                        />
                    </label>
                    <div className="flex justify-between my-2">
                        <button onClick={() => setClicked("")} className="bg-red-800 text-white px-4 py-2" type="button">Cancel</button>
                        <button className="bg-red-800 text-white px-4 py-2" type="submit">Submit</button>
                    </div>
                </form>
            </InformationModal>}
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
                data={datas}
                pagination={tableData.length > 10}
                responsive

            />
        </>


    );
}

export default AdviserRecordDatagridview;