import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate()
    return (
        <div className="not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Oops! Page Not Found</h2>
          <p>We can&rsquo;t seem to find the page you&apos;re looking for.</p>
          <button onClick={() => navigate('/')}>Go Back Home</button>
        </div>
      </div>
    );
};

export default Error;