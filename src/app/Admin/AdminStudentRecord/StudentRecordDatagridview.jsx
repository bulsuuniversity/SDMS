import DataTable from 'react-data-table-component';


const StudentRecordDatagridview = ({ tableData, setClickedID, setOpenINfo }) => {
  
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

    );
}

export default StudentRecordDatagridview;