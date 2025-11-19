
// import axios from "axios";
// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [githubUserName, setGithubUserName] = useState("");
//   const [userObj, setUserObj] = useState(null);
//   const [repos, setRepos] = useState([]);

//   const searchUser = async () => {
//     if (!githubUserName.trim()) {
//       alert("Enter a valid username!");
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `https://api.github.com/users/${githubUserName}`
//       );
//       const reposRes = await axios.get(
//         `https://api.github.com/users/${githubUserName}/repos?sort=updated&per_page=5`
//       );

//       setUserObj(res.data);
//       setRepos(reposRes.data);
//     } catch (err) {
//       console.log("error", err.message);
//       setUserObj(null);
//       setRepos([]);
//     } finally {
//       setGithubUserName(""); 
//     }
//   };

//   return (
//     <div className="app-container">
//       <h1 className="app-title">🔍 GitHub Profile Finder</h1>

//       <div className="search-box">
//         <input
//           type="text"
//           placeholder="Enter GitHub Username"
//           value={githubUserName}
//           onChange={(e) => setGithubUserName(e.target.value)}
//         />
//         <button onClick={searchUser}>Search</button>
//       </div>

//       {userObj && (
//         <div className="profile-card">
//           <img src={userObj.avatar_url} alt="avatar" className="avatar" />
//           <h2>{userObj.name || "No Name Available"}</h2>
//           <p className="username">@{userObj.login}</p>
//           <p className="bio">{userObj.bio || "This user has no bio"}</p>

//           <div className="stats">
//             <span>👥 Followers: {userObj.followers}</span>
//             <span>🔗 Following: {userObj.following}</span>
//             <span>📦 Repos: {userObj.public_repos}</span>
//           </div>

//           <a
//             href={userObj.html_url}
//             target="_blank"
//             rel="noreferrer"
//             className="profile-btn"
//           >
//             View Profile
//           </a>
//         </div>
//       )}

//       {repos.length > 0 && (
//         <div className="repos-section">
//           <h3>⭐ Latest Repositories</h3>
//           <ul>
//             {repos.map((repo) => (
//               <li key={repo.id}>
//                 <a href={repo.html_url} target="_blank" rel="noreferrer">
//                   {repo.name}
//                 </a>
//                 <span>⭐ {repo.stargazers_count}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;






import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [githubUserName, setGithubUserName] = useState("");
  const [userObj, setUserObj] = useState(null);
  const [repos, setRepos] = useState([]);
  const [notFound, setNotFound] = useState(false); // <-- NEW STATE

  const searchUser = async () => {
    if (!githubUserName.trim()) {
      alert("Enter a valid username!");
      return;
    }

    try {
      const res = await axios.get(
        `https://api.github.com/users/${githubUserName}`
      );
      const reposRes = await axios.get(
        `https://api.github.com/users/${githubUserName}/repos?sort=updated&per_page=5`
      );

      setUserObj(res.data);
      setRepos(reposRes.data);
      setNotFound(false); // reset error state if found
    } catch (err) {
      console.log("error", err.message);
      setUserObj(null);
      setRepos([]);
      setNotFound(true); // mark as not found
    } finally {
      setGithubUserName("");
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🔍 GitHub Profile Finder</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={githubUserName}
          onChange={(e) => setGithubUserName(e.target.value)}
        />
        <button onClick={searchUser}>Search</button>
      </div>

      {/* Show Not Found Card */}
      {notFound && (
        <div className="profile-card">
          <h2>User Not Found ❌</h2>
          <p className="bio">
            We couldn’t find any GitHub profile with that username.
          </p>
        </div>
      )}

      {/* Show Profile Card */}
      {userObj && !notFound && (
        <div className="profile-card">
          <img src={userObj.avatar_url} alt="avatar" className="avatar" />
          <h2>{userObj.name || "No Name Available"}</h2>
          <p className="username">@{userObj.login}</p>
          <p className="bio">{userObj.bio || "This user has no bio"}</p>

          <div className="stats">
            <span>👥 Followers: {userObj.followers}</span>
            <span>🔗 Following: {userObj.following}</span>
            <span>📦 Repos: {userObj.public_repos}</span>
          </div>

          <a
            href={userObj.html_url}
            target="_blank"
            rel="noreferrer"
            className="profile-btn"
          >
            View Profile
          </a>
        </div>
      )}

      {/* Show Repositories */}
      {repos.length > 0 && !notFound && (
        <div className="repos-section">
          <h3>⭐ Latest Repositories</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
                <span>⭐ {repo.stargazers_count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;