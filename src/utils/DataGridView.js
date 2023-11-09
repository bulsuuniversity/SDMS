import DataTable from 'react-data-table-component';

const DataGridView = ({ headerData, tableData, setClickedID, setOpenINfo }) => {
    const columns = [
        {
            name: <div className='flex text-center'>{headerData[0]}</div>,
            selector: row => row.zero,
            sortable: true,
            cell: (row) => <div onClick={() => handleRowClick(row)} style={{ whiteSpace: 'normal' }}>{row.zero}</div>,
        },
        {
            name: <div className='flex text-center'>{headerData[1]}</div>,
            selector: row => row.one,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.one}</div>,
        },
        {
            name: <div className='flex text-center'>{headerData[2]}</div>,
            selector: row => row.two,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.two}</div>,
        },
        {
            name: <div className='flex text-center'>{headerData[3]}</div>,
            selector: row => row.three,
            sortable: true,
            cell: (row) => <div className='line-clamp-3 whitespace-normal'>{row.three}</div>,
        },
        {
            name: <div className='flex text-center'>{headerData[4]}</div>,
            selector: row => row.five,
            sortable: true,
            cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.five}</div>,
            conditionalCellStyles: [
                {
                    when: (row) => row.five === "Pending",
                    style: {
                        color: 'red',
                    },
                },
                {
                    when: (row) => row.five === "Cleared",
                    style: {
                        color: 'green',
                    },
                },
            ],
        },
    ];
    const data = Object.values(tableData).map((tableData, index) => ({
        id: tableData.id,
        zero: tableData.zero,
        one: tableData.one,
        two: tableData.two,
        three: tableData.three,
        five: tableData.five,
    }))

    const handleRowClick = (row) => {
        setClickedID(row.id)
        console.log(row.id)
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
            responsive
        />

    );
}

export default DataGridView;