import DataTable from 'react-data-table-component';
import { BiTrash } from 'react-icons/bi';
import { useState } from 'react';

const ReportsDatagridview = ({ tableData, setClickedID, setOpenINfo }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const rowDisabledCriteria = row => row.status === 'Pending';

    const columns = [
        {
            name: <div className='flex text-center'>TICKET NO.</div>,
            selector: row => row.ticket,
            sortable: true,
            cell: (row) => <div onClick={() => handleRowClick(row)} style={{ whiteSpace: 'normal', textAlign: 'center' }}>{row.ticket}</div>,
        },
        {
            name: <div className='flex text-center'>ACTION OF INDISCIPLINE</div>,
            selector: row => row.action,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal', textAlign: 'center' }}>{row.action}</div>,
        },
        {
            name: <div className='flex text-center'>DATE OF INCIDENT &#40;MM/DD/YYYY&#41;</div>,
            selector: row => row.date,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal', textAlign: 'center' }}>{row.date}</div>,
        },
        {
            name: <div className='flex text-center'>RATE OF OCCURENCE</div>,
            selector: row => row.rate,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal', textAlign: 'center' }}>{row.rate}</div>,
        },
        {
            name: <BiTrash size={32} />,
            cell: (row) => (
                <input
                    style={{ whiteSpace: 'normal', textAlign: 'center' }}
                    type="checkbox"
                    checked={selectedRows.some((r) => r.id === row.id)}
                    onChange={() => handleRowSelection(row)}
                />
            ),
        },
        {
            name: <div className='flex text-center'>STATUS</div>,
            selector: row => row.status,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal', textAlign: 'center' }}>{row.status}</div>,
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
    ];
    const data = Object.values(tableData).map((reports, index) => ({
        id: index,
        ticket: reports.id,
        action: reports.actionOfDiscipline,
        date: reports.dateOfIncident,
        rate: reports.rateOfOccurence,
        status: reports.status,
    }));

    const handleRowClick = (row) => {
        setClickedID(row.ticket)
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

    console.log(selectedRows)

    const customStyles = {
        rows: {
            style: {
                cursor: 'pointer',
            },
        },
        headCells: {
            style: {
                backgroundColor: "#99acff",
            },
        },
    };

    return (
        <>
            {selectedRows.length > 0 &&
                <div className='bg-red-200 p-4 flex items-center justify-between gap-10'>
                    <p>{selectedRows.length} items selected</p>
                    <button className='bg-red-500 text-white rounded-md px-4 py-2'>Delete</button>
                </div>}
            <DataTable
                fixedHeader
                fixedHeaderScrollHeight="500px"
                customStyles={customStyles}
                onRowClicked={handleRowClick}
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
