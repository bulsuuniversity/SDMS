import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";


const StudentHistoryDatagridview = ({ tableData, setClickedID, setOpenINfo, status, handleGetData }) => {
    const [selectedRows, setSelectedRows] = useState([]);

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
            name: <div className='flex text-center'>REPORTED STUDENT</div>,
            selector: row => row.offender,
            sortable: true,
            cell: (row) => <div className='line-clamp-3 whitespace-normal text-center'>{row.offender}</div>,
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
            cell: (row) => <div style={{ whiteSpace: 'normal', width: "100%", textAlign: 'center' }}>{row.rate}</div>,
        },
        {
            name: <div className='flex text-center'>STATUS</div>,
            selector: row => row.status,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal', width: "100%", textAlign: 'center' }}>{row.status}</div>,
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
        offender: reports.offender,
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

export default StudentHistoryDatagridview;
