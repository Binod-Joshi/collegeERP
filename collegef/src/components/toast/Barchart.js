import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label,data }) => {
  if (active && payload && payload.length) {
    const present = payload.find((data) => data.dataKey === 'present');
    const absent = payload.find((data) => data.dataKey === 'absent');
    const total = data.filter((subjectt) => subjectt.subject === label);
    const totalPresent =total[0].allData.filter((dataa) => dataa.status === "Present").length
    const attendCount = `(${totalPresent}/${total[0]?.allData?.length})`;

    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '5px' }}>
        <p className="label">{label}</p>
        <p className="present">Present: {`${present.value}%`}</p>
        <p className="absent">Absent: {`${absent.value}%`}</p>
        <p className="attend">Attend: {attendCount}</p>
      </div>
    );
  }

  return null;
};


const Barchart = ({ data }) => {
  return (
    <div className="courseDetail">
           
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barGap={10} // Add a gap between bars
        categoryGap={30} // Add a gap between categories
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis domain={[0, 100]} />
        <Tooltip   content={<CustomTooltip  data={data}/>}/>
        <Legend />
        <Bar dataKey="present" fill="green" />
        <Bar dataKey="absent" fill="red" />
      </BarChart>
      <div>
        <p style={{ fontWeight: 'bold', fontSize: '18px' }}> Fig(ii):Attendance Detail in BarChart</p>
      </div>
    </div>
  );
};

export default Barchart
