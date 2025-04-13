import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg1 from "../assets/bg1.png";
import logo from "../assets/logo.png";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(res.data);
    } catch (err: any) {
      setError("User not found or GitHub API limit reached");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (type: "Repo" | "Commits") => {
    navigate(`/${type}`, { state: { username } });
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 py-10 text-white"
      style={{ backgroundImage: `url(${bg1})`,
      backgroundAttachment: 'fixed', }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-300 mb-6 text-center drop-shadow-md">
        GitHub Profile Analyzer
      </h1>

      <img src={logo} alt="logo" className="w-24 h-24 mb-6 rounded-full shadow-lg" />

      <div className="w-full max-w-sm space-y-4">
        <Input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-black/30 text-white placeholder-purple-300 border-2 border-purple-500 focus:ring-4 focus:ring-purple-700 backdrop-blur-md"
        />

        <Button
          onClick={handleAnalyze}
          disabled={loading || !username}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition mt-2 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Analyze"}
        </Button>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </div>

      {userData && (
        <>
          <Card className="mt-10 w-full max-w-md bg-black/40 text-white border border-purple-600 rounded-xl shadow-lg backdrop-blur-md">
            <CardHeader className="flex items-center gap-4 p-5">
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="w-16 h-16 rounded-full border-2 border-purple-500 hover:scale-105 transition"
              />
              <div>
                <CardTitle className="text-lg">{userData.name || userData.login}</CardTitle>
                <CardDescription className="text-purple-300">@{userData.login}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm text-purple-200 space-y-1">
              <p>📅 Joined: {new Date(userData.created_at).toDateString()}</p>
              <p>📁 Public Repos: {userData.public_repos}</p>
              <p>👥 Followers: {userData.followers}</p>
              <p>👤 Following: {userData.following}</p>
              {userData.bio && <p>📝 Bio: {userData.bio}</p>}
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
            <Button
              onClick={() => handleNavigate("Repo")}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium"
            >
              View Repositories
            </Button>
            <Button
              onClick={() => handleNavigate("Commits")}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium"
            >
              View Commit Chart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
