import { BsCircle } from "react-icons/bs";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);



const LightOffenses = ({ reports, status }) => {

    const littering = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Littering")).length) : 1;
    const vandalism = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Vandalism")).length) : 1;
    const disturbance = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Disturbance")).length) : 1;
    const unauthorized = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Unauthorized")).length) : 1;

    const legends = { littering, vandalism, disturbance, unauthorized }
    const total = littering + vandalism + disturbance + unauthorized


    const pieOptions = {
        responsive: true,
        plugins: {
            legend: false,
            datalabels: {
                color: 'black',
                borderColor: "#fff",
                textStrokeColor: 'white',
                textStrokeWidth: 2,
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    const percentage = total
                        ? Math.round((value / total) * 100) : 0;
                    return percentage === 0 ? '' : `${label}: ${percentage}%`;
                },
            },
        }
    };

    const pieData = {
        labels: ["Littering / ...",
            "Vandalism / ...",
            "Disturbance / ...",
            "Unauthorized ...",
        ],
        datasets: [
            {
                label: 'Count',
                data: [littering,
                    vandalism,
                    disturbance,
                    unauthorized,
                ],
                backgroundColor: [
                    'rgb(239, 68, 68)',
                    'rgb(34, 197, 94)',
                    'rgb(59, 130, 246)',
                    'rgb(249, 115, 22)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className="grid gap-4">
            <div className="font-bold grid text-center items-center">
                NUMBER OF {status ? 'Pending' : 'Cleared'} LIGHT OFFENSES:
                {total && total.length}
            </div>
            <div className="flex items-center p-5 gap-5 ">
                <div className="w-60 h-60 m-4">
                    <Pie data={pieData} options={pieOptions} />
                </div>
                <div className="bg-white rounded-lg p-4 grid">
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-red-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Littering / Disribution of unauthorized printed materials</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count: {legends && legends.littering}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-green-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Vandalism / Unauthorized posting of printed material</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.vandalism}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-blue-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Disturbance / Disrupt of classes or any Educational-Related-Programs</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.disturbance}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-orange-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Unauthorized solicitation of funds or selling of any ticket</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.unauthorized}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LightOffenses;