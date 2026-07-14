import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchApiPosts } from "./store/apiSlice";

function App() {
  const dispatch = useDispatch();
  const { posts, loading, error, lastFetched } = useSelector((state) => state.api);

  useEffect(() => {
    // Dispatch the thunk; it will automatically abort if cache is within 5 mins
    dispatch(fetchApiPosts());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React API Integration (Redux Cached)</h1>
      {lastFetched && (
        <p style={{ color: 'gray', fontSize: '0.9rem' }}>
          Last Fetched: {new Date(lastFetched).toLocaleTimeString()}
        </p>
      )}

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>
            {post.id}. {post.title}
          </h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
