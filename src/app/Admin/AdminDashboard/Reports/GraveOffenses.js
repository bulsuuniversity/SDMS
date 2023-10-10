import { BsCircle } from "react-icons/bs";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState } from "react";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const GraveOffenses = ({ reports, status }) => {
   
    const theft = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Theft")).length) : 1;
    const indecency = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Indecency")).length) : 1;
    const physical = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Physical")).length) : 1;
    const possession = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Possession")).length) : 1;
    const carrying = reports ? (Object.values(reports).filter(report => (report.actionOfDiscipline).includes("Carrying")).length) : 1;

    const legends = { theft, indecency, physical, possession, carrying }
    const total = theft + indecency + physical + possession + carrying

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
        labels: ["Theft, attempted ...",
            "Indecency in ...",
            "Physical / ...",
            "Possession, Use ...",
            "Carrying of ..."
        ],
        datasets: [
            {
                label: 'Count',
                data: [theft,
                    indecency,
                    physical,
                    possession,
                    carrying
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
                NUMBER OF {status ? 'Pending' : 'Cleared'} GRAVE OFFENSES:
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
                            <p className={`hover:line-clamp-none line-clamp-1`}>Theft, attempted theft and/or unauthorized possession or use of property/services belonging to the university</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.theft}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-green-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Indecency in Any Form of Obscene or Lewd Behavior</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.indecency}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-blue-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Physical / Verbal / Sexual / Mental / Emotional Abuse, Threat, Cyberbullying, Hazing, Coercion</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.physical}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-orange-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Possession, Use, Sale or Purchase of Any Illegal Drugs Inside The University Premises</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.possession}</p>
                        </div>
                    </div>
                    <div className="grid justify-start">
                        <label className="flex items-center gap-4">
                            <div><BsCircle size={20} className="bg-gray-500 rounded-full" /></div>
                            <p className={`hover:line-clamp-none line-clamp-1`}>Carrying of Firearms and Other Weapons</p>
                        </label>
                        <div className="flex justify-center">
                            <p>Count:  {legends && legends.carrying}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GraveOffenses;