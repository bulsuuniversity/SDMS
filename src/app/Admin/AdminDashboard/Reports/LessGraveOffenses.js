import { BsCircle } from "react-icons/bs";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);


const LessGraveOffenses = ({ reports, status }) => {
    const smoking = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Cheating")).length) : 1;
    const malicious = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Plagiarism")).length) : 1;
    const deception = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Falsification")).length) : 1;
    const disrespectful = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Plagiarism")).length) : 1;
    const damage = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Falsification")).length) : 1;

    const legends = { smoking, malicious, deception, disrespectful, damage }
    const total = smoking + malicious + deception + disrespectful + damage



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
        labels: ["Smoking, gam...",
            "Malicious or ...",
            "Deception ...",
            "Disrespectful ...",
            "Damage or ..."
        ],
        datasets: [
            {
                label: 'Count',
                data: [smoking,
                    malicious,
                    deception,
                    disrespectful,
                    damage
                ],
                backgroundColor: [
                    'rgb(239, 68, 68)',
                    'rgb(34, 197, 94)',
                    'rgb(59, 130, 246)',
                    'rgb(249, 115, 22)',
                    'rgb(132, 145, 166)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="grid gap-4">
            <div className="font-bold grid text-center items-center">
                NUMBER OF {status ? 'Pending' : 'Cleared'} LESS GRAVE OFFENSES:
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
                            <p className={`hover:line-clamp-none line-clamp-1`}>Smoking, gambling or being under the influence of alcohol</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.smoking}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-green-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Malicious or unfounded accusations</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.malicious}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-blue-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Deception, impersonation or fraud</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.deception}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-orange-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Disrespectful behavior or refusal to comply with the directions of the university</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.disrespectful}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-gray-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Damage or unauthorized presence in or use of university premises, facilities or property, in violation of posted signage, when closed or after normal operatimg hours</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.damage}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LessGraveOffenses;