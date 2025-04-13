import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import bg1 from "../assets/bg1.png";
import { motion } from "framer-motion";

const RepoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await res.json();
        setRepos(data);
      } catch (error) {
        console.error("Failed to fetch repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  return (
    <div
    className="min-h-screen bg-center bg-no-repeat bg-cover px-4 sm:px-6 lg:px-12 py-6"
    style={{
      backgroundImage: `url(${bg1})`,
      backgroundAttachment: 'fixed',
    }}
  >
  
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-white text-center drop-shadow">
        Repositories of {username}
      </h2>

      {loading ? (
        <p className="text-center font-semibold text-white text-lg">⏳ Loading repositories...</p>
      ) : repos.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo: any) => (
            <motion.div
              key={repo.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-black/40 hover:bg-purple-700/80 transition-all duration-300 shadow-md border border-purple-500 backdrop-blur rounded-xl">
                <CardContent className="p-4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-bold text-white hover:underline break-words"
                  >
                    {repo.name}
                  </a>
                  <p className="text-sm text-purple-200 mt-2">
                    {repo.description || "No description provided."}
                  </p>
                  <p className="mt-2 text-xs text-purple-400">⭐ {repo.stargazers_count}</p>
                </CardContent>
                <CardDescription className="px-4 pb-4 text-sm text-purple-300 space-y-1">
                  <p>🔒 Visibility: {repo.visibility}</p>
                  <p>🍴 Forks: {repo.forks}</p>
                  <p>❗ Open Issues: {repo.open_issues}</p>
                  <p>👀 Watchers: {repo.watchers}</p>
                  <p>🌿 Default Branch: {repo.default_branch}</p>
                </CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center font-semibold text-white text-lg">🚫 No repositories found.</p>
      )}

      <div className="flex flex-col sm:flex-row justify-center items-center mt-10 gap-4 pb-10">
        {repos.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/Commits", { state: { username } })}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold transition w-full sm:w-auto"
          >
            View Commit Chart
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/", { state: { username } })}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold transition w-full sm:w-auto"
        >
          Home Page
        </motion.button>
      </div>
    </div>
  );
};

export default RepoPage;
