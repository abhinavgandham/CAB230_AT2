import { Bar } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        type: "category", // Specify the scale type as category
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default function Chart() {
  return (
    <div>
      <h2>Volcano Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
