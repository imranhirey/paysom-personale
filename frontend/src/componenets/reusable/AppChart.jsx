// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'react-chartjs-2';
// import { Bar } from 'react-chartjs-2';
// import faker from 'faker'
// export default function AppChart() {
//     ChartJS.register(
//         CategoryScale,
//         LinearScale,
//         BarElement,
//         Title,
//         Tooltip,
//         Legend
//       );
      
//        const options = {
//         plugins: {
//           title: {
//             display: true,
//             text: 'Chart.js Bar Chart - Stacked',
//           },
          
//         },
//         responsive: true,
//         scales: {
//           x: {
//             stacked: true,
//           },
//           y: {
//             stacked: true,
//           },
//         },
//       };
      
//       const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
//        const data = {
//         labels,
//         datasets: [
//           {
//             label: 'Dataset 1',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             backgroundColor: 'rgb(255, 99, 132)',
//           },
//           {
//             label: 'Dataset 2',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             backgroundColor: 'rgb(75, 192, 192)',
//           },
//           {
//             label: 'Dataset 3',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             backgroundColor: 'rgb(53, 162, 235)',
//           },
//         ],
//       };
//       return <Bar width='500px' style={{
//         background:'white',
//         padding:'10px'
//       }} height='200px' options={options} data={data} />;
// }

import React from 'react'
import {Doughnut} from 'react-chartjs-2'

export default function AppChart() {
  return (
    <div  style={{
      margin:'14px'

    }}>here we will render charts and graphs</div>
  )
}




