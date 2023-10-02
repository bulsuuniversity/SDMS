import DataTable from 'react-data-table-component';
import { BiTrash } from 'react-icons/bi';
import { FcDeleteDatabase } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import axios from 'axios';
import { headers, url } from '@/app/libs/api';
import useLoading from '@/utils/Loading';
import InformationModal from '@/utils/InformationModal';
import useConfirmation from '@/utils/ConfirmationHook';
import { GiDivingDagger } from 'react-icons/gi';

const ReportsDatagridview = ({ tableData, setClickedID, setOpenINfo, status, handleGetData }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const { loading, startLoading, stopLoading } = useLoading()
    const [success, setSuccess] = useState(false)
    const { showConfirmation, ConfirmationDialog } = useConfirmation();

    const ids = selectedRows.map((selected) => selected.id)
    const handleDelete = async () => {
        startLoading()
        try {
            await axios.post(`${url}/api/DeleteReport`,
                { ids: ids },
                { headers });
            handleGetData()
            setSuccess(true)
            setSelectedRows([]);
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const handleSubmitReport = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcDeleteDatabase size={32}/>Delete Report</div>
             <p className='text-xl p-6'>Are you sure you want to delete {selectedRows > 1 ? 'these reports' : 'this report'}?</p>
             </div>, () => {
            handleDelete()
        });
    };

    useEffect(() => {
        setSelectedRows([]);
    }, [status])


    const rowDisabledCriteria = row => row.status === 'Pending';

    const columns = [
        {
            name: <div className='flex text-center'>TICKET NO.</div>,
            selector: row => row.ticket,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal', textAlign: 'center' }}>{row.ticket}</div>,
        },
        {
            name: <div className='flex text-center'>ACT OF MISCONDUCT</div>,
            selector: row => row.action,
            sortable: true,
            cell: (row) => <div className='line-clamp-3 whitespace-normal text-center'>{row.action}</div>,
        },
        {
            name: <div className='flex text-center'>DATE REPORTED &#40;MM/DD/YYYY&#41;</div>,
            selector: row => row.date,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal', textAlign: 'center' }}>{row.date}</div>,
        },
        {
            name: <div className='flex text-center'>RATE OF OCCURENCE</div>,
            selector: row => row.rate,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal',width: "100%", textAlign: 'center' }}>{row.rate}</div>,
        },
        {
            name: <div className='flex text-center'>STATUS</div>,
            selector: row => row.status,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal',width: "100%", textAlign: 'center' }}>{row.status}</div>,
            conditionalCellStyles: [
                {
                    when: (row) => row.status === "Pending",
                    style: {
                        color: 'red',
                    },
                },
                {
                    when: (row) => row.status === "Cleared",
                    style: {
                        color: 'green',
                    },
                },
            ],
        },
        {
            name: <div className='flex text-center'>VIEW</div>,
            cell: (row) => <div onClick={() => handleRowClick(row)}
                className='cursor-pointer w-full grid place-content-center'>
                <IoEyeSharp size={20} /></div>
            ,
        },
        status && {
            name: <div className='flex text-center'>DELETE</div>,
            cell: (row) => (
                <div className={`flex w-full justify-center `}>
                    <input
                        className='cursor-pointer'
                        type="checkbox"
                        checked={selectedRows.some((r) => r.id === row.id)}
                        onChange={() => handleRowSelection(row)}
                    />
                </div>
            ),
        },
    ];
    function formatDate(inputDate) {
        const date = new Date(inputDate);
      
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${month}/${day}/${year}`;
    }

    
    const data = Object.values(tableData).map((reports, index) => ({
        id: reports.id,
        ticket: reports.ticketNo,
        action: reports.actionOfDiscipline,
        date: formatDate(reports.createdAt),
        rate: reports.rateOfOccurence,
        status: reports.status,
    }));

    const handleRowClick = (row) => {
        setClickedID(row.id)
        setOpenINfo(true)
    };

    const handleRowSelection = (row) => {
        const isSelected = selectedRows.some((r) => r.id === row.id);
        if (isSelected) {
            setSelectedRows(selectedRows.filter((r) => r.id !== row.id));
        } else {
            setSelectedRows([...selectedRows, row]);
        }
    };



    const customStyles = {
        headCells: {
            style: {
                backgroundColor: "#a11818",
                color: "#ffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            },
        },
    };

    return (
        <>
            {selectedRows.length > 0 &&
                <div className='text-red-600 bg-white p-4 flex items-center justify-between gap-10'>
                    <p className='font-bold'>{selectedRows.length} items selected</p>
                    <button disabled={loading} onClick={handleSubmitReport} className='bg-red-600 text-white rounded-md px-4 py-2'>{loading ? 'Deleting' : 'Delete'}</button>
                </div>}
            <ConfirmationDialog />
            {success && <InformationModal>
                <div className='bg-amber-200 grid p-10 rounded-lg gap-4'>
                    <p>Deleted Successfully!</p>
                    <button onClick={() => setSuccess(false)} className='bg-green-600 rounded-lg py-2 px-4'>Okay</button>
                </div>
            </InformationModal>}
            <DataTable
                fixedHeader
                fixedHeaderScrollHeight="500px"
                customStyles={customStyles}
                columns={columns}
                data={data}
                pagination={tableData.length > 10}
                responsive
                selectableRowDisabled={rowDisabledCriteria}
            />
        </>

    );
}

export default ReportsDatagridview;
