import Layout from "../components/Layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Home() {
  return (
    <Layout pageTitle={"Home"}>
      Welcome
      <div style={{ position: "relative", marginTop: 50 }}>
        <Doughnut
          height={"300px"}
          data={{
            labels: ["label1", "label2", "label3"],
            datasets: [
              {
                data: [1, 2, 4],
                label: "mydataset1",
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
              },
            ],
          }}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <div style={{ position: "relative", marginTop: 50 }}>
        <Bar
          height={"300px"}
          data={{
            labels: ["label1", "label2", "label3"],
            datasets: [
              {
                data: [1, 2, 4],
                label: "mydataset1",
                backgroundColor: "green",
              },
              {
                data: [5, 2, 10],
                label: "mydataset2",
                backgroundColor: "blue",
              },
            ],
          }}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </Layout>
  );
}
