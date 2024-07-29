import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Tage 1', euro: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', euro: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', euro: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', euro: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', euro: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', euro: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', euro: 3490, pv: 4300, amt: 2100 },
];

const Chart = () => {
  return (
      <div className="chart-container">
    <LineChart width={600} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Line type="monotone" dataKey="euro" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
    </LineChart>
        </div>
  );
};

export default Chart;
