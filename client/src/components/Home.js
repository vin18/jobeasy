import { useNavigate } from 'react-router-dom';
import homeBanner from '../assets/hero.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="hero">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <img src={homeBanner} className="max-w-lg" />
          <div className="mr-16">
            <h1 className="mb-4 text-5xl font-bold">JobEasy</h1>
            <p className="mb-4 text-xl">
              Resumes are old fashioned. We believe in proof of work. <br />
              Let your work do the talking 🚀
            </p>
            <button
              onClick={() => navigate(`/login`)}
              className="btn btn-primary mr-2"
            >
              Join the community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
