import React from 'react';
import { PieChart, Pie } from 'recharts';

const Piechart = ({data}) => {
  const renderLabel = ({ name, value }) => `${name}: ${value}%`;
console.log(data);
  return (
    <div className="courseDetail">
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label={renderLabel}/>
      {/* <Tooltip /> */}
    </PieChart>
    <div style={{ marginBottom: '10px' }}>
        <p style={{ fontWeight: 'bold', fontSize: '18px' }}> Fig(i): Overall Attendance in pieChart</p>
      </div>
    </div>
  );
};

export default Piechart

