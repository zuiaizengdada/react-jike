import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ title }: any) => {
  const mainRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.getInstanceByDom(mainRef.current!) ?? echarts.init(mainRef.current);

    const option: EChartsOption = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };

    myChart.setOption(option);
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        width: '500px',
        height: '400px'
      }}
    >
      home
    </div>
  );
};

export default BarChart;
