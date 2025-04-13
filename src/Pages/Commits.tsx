import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import bg1 from "../assets/bg1.png";

type ChartData = {
  repo: string;
  count: number;
};

const Commits = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const repos = await res.json();

        const commitCounts: ChartData[] = await Promise.all(
          repos.map(async (repo: any) => {
            try {
              const commitsRes = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/commits`
              );
              const commits = await commitsRes.json();
              return {
                repo: repo.name,
                count: Array.isArray(commits) ? commits.length : 0,
              };
            } catch {
              return { repo: repo.name, count: 0 };
            }
          })
        );

        setData(commitCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username, navigate]);

  return (
    <div
      className="min-h-screen px-4 py-6 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 drop-shadow">
        Commits per Repository
      </h2>

      <div className="w-full h-[400px] bg-black/40 backdrop-blur rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="repo"
              stroke="#ccc"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", borderRadius: "6px", border: "none" }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md text-white font-semibold transition w-full sm:w-auto"
        >
          ⬅️ Back to Home
        </button>
      </div>
    </div>
  );
};

export default Commits;
