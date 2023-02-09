
import { Liquid } from '@ant-design/charts';


type LiquidChartProps = {
  percent: number;

}

const LiquidChart: React.FC<LiquidChartProps> = ({ percent }: LiquidChartProps) => {
  var config = {
    percent: percent,
    outline: {
      border: 3,
      distance: 4,
    },
    wave: { length: 128 },

  };
  return <Liquid height={161} autoFit {...config} />;
};

export default LiquidChart;