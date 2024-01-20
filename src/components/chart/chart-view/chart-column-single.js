// components
import PropTypes from 'prop-types';
import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function ChartColumnSingle({labels, series,hoverText }) {
  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: labels || ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} ${hoverText || ""}`,
      },
    },
  });

  return <Chart dir="ltr" type="bar" series={series} options={chartOptions} height={320} />;
}

ChartColumnSingle.propTypes = {
  series: PropTypes.array,
  labels: PropTypes.array,
  hoverText: PropTypes.string,
};
