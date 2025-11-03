import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface TimeUsedChartProps {
  percentage?: number;
}

function GaugeChart({ percentage = 40 }: TimeUsedChartProps) {

  const data = [
    {
      name: "Time Used",
      value: percentage,
      fill: "#0C7FA7",
    },
  ];
  return (
    <div style={{ textAlign: "center" }} className="w-full h-full focus:outline-none">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="75%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={30}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: "#EAECF0", strokeWidth: 0 }}
            dataKey="value"
            cornerRadius={14}
            //   clockWise={true}
            width="100%"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GaugeChart;
