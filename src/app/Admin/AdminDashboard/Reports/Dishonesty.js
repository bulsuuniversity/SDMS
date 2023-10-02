import { BsCircle } from "react-icons/bs";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Dishonesty = ({ reports, status }) => {


    const cheating = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Cheating")).length) : 1;
    const plagiarism = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Plagiarism")).length) : 1;
    const falsification = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Falsification")).length) : 1;

    const legends = { cheating, plagiarism, falsification }
    const total = cheating + plagiarism + falsification



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
        labels: ["Cheating",
            "Plagiarism",
            "Falsification ..."
        ],
        datasets: [
            {
                label: 'Count',
                data: [cheating,
                    plagiarism,
                    falsification,
                ],
                backgroundColor: [
                    'rgb(239, 68, 68)',
                    'rgb(34, 197, 94)',
                    'rgb(59, 130, 246)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="grid gap-4">
            <div className="font-bold grid text-center items-center">
                NUMBER OF {status ? 'Pending' : 'Cleared'} DISHONESTY ON ACADEMIC PURSUITS:
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
                            <p>Cheating</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count: {legends && legends.cheating}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-green-500 rounded-full" /></div>
                            <p>Plagiarism</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.plagiarism}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-blue-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Falsification or Forging of Academic Records and Official Documents</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.falsification}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dishonesty;