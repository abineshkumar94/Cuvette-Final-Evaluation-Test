import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css";
import styles from "./bookmarkpage.module.css";
import Bookmarkicon from "../Image/bookmark-icon.png";
import Propic from "../Image/propic.svg";
import Hamburgericon from "../Image/Ham.svg";
import all from "../Image/all-img.jpg";
import mimage from "../Image/Medic-img.jpg";
import fimage from "../Image/fruity-img.jpg";
import wimage from "../Image/world-img.jpg";
import simage from "../Image/science-img.jpg";
import game from "../Image/sports-img.jpg";
import AddStories from "./storiesmodal/AddStoriesModal";
import Register from "./Register";
import SignIn from "./Signin";
import Logout from "./Logout";
import All from "./All";
import Fruits from "./Fruits";
import Medical from "./Medical";
import World from "./World";
import Science from "./Science";
import Sports from "./Sports";
import Trending from "./OnTrending";
import YourStroy from "./YourStory";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [register, setregister] = useState(false);
  const [signin, setsignin] = useState(false);
  const [NewNameForLogoutModal, setNewNameForLogoutModal] = useState(false);
  const [showuserDetails, setshowUserDetails] = useState();
  const [userId, setUserId] = useState();
  const [NameForstories, setNameForStories] = useState([]);
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [showFilter, setShowFilter] = useState({
    all: false,
    fimage: false,
    mimage: false,
    wimage: false,
    simage: false,
    game: false,
  });
  const backendUrl = `https://swip-troy-backend.vercel.app/api/v1/stories/getallstories`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(backendUrl);

        const data = res.data;
        setNameForStories(data.stories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const tokenInLocalStorage = localStorage.getItem("token");
    const userIdInLocalStorage = localStorage.getItem("userId");
    if (tokenInLocalStorage) {
      setIsLoggedIn(true);
    }
    if (userIdInLocalStorage) {
      setUserId(userIdInLocalStorage);
    }
  }, []);

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  const userUrl = `https://swip-troy-backend.vercel.app/api/v1/${userId}`;

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(userUrl);
        const userDetails = result.data;
        console.log(userDetails);
        setshowUserDetails(userDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [userId]);

  const handleMedicalButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      mimage: prevState.mimage ? false : true,
    }));
  };

  const handleaAllButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      all: prevState.all ? false : true,
    }));
  };

  const handleFruitsButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      fimage: prevState.fimage ? false : true,
    }));
  };

  const handleWorldbuttonclick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      wimage: prevState.wimage ? false : true,
    }));
  };

  const handleScienceButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      simage: prevState.simage ? false : true,
    }));
  };

  const handleSportsButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      game: prevState.game ? false : true,
    }));
  };

  const handleRegisterClick = () => {
    setregister(true);
  };

  const handleCloseRegister = () => {
    setregister(false);
  };

  const handleSigninClick = () => {
    setsignin(true);
  };

  const handleCloseSignin = () => {
    setsignin(false);
  };

  const handleChange = (event) => {
    event.preventDefault();
    navigate(`/bookmark/${userId}`);
  };

  const handleModelHandeler = () => {
    setIsAddingStory(true);
  };

  const handleHamButtonClick = () => {
    setNewNameForLogoutModal((prevState) => !prevState);
  };

  return (
    <div className="header">
      <div className="navbar">
        {" "}
        <h3 className="swip">SwipTory</h3>
        {isAddingStory && (
          <AddStories
            setOpenAddStoriesModal={setIsAddingStory}
            userId={userId}
            stories={NameForstories}
          />
        )}
        {isLoggedIn ? (
          <div>
            <button className={styles.bookmarkBtn} onClick={handleChange}>
              <i class="fa-solid fa-bookmark"></i>Bookmark
            </button>
            <button onClick={handleModelHandeler} className={styles.addStoryBtn}>
              Add story
            </button>
            <img
              className={styles.bookmarkProfilePic}
              src={Propic}
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <button className={styles.hamBtn} onClick={handleHamButtonClick}>
              <img
                src={Hamburgericon}
                alt=""
                style={{ width: "18px", height: "18px" }}
              />
            </button>
            {NewNameForLogoutModal ? (
              <Logout parent={"home"} userDetails={showuserDetails} />
            ) : null}
          </div>
        ) : (
          <div>
            <button className="r-btn" onClick={handleRegisterClick}>
              Register Now
            </button>
            {register && (
              <Register
                onClose={handleCloseRegister}
                setIsLoggedIn={setIsLoggedIn}
                setUserDetails={setshowUserDetails}
                setUserId={setUserId}
              />
            )}
            <button className="signin-btn" onClick={handleSigninClick}>
              Login
            </button>
            {signin && (
              <SignIn
                onClose={handleCloseSignin}
                setIsLoggedIn={setIsLoggedIn}
                setUserDetails={setshowUserDetails}
                parent="home"
                setUserId={setUserId}
              />
            )}
          </div>
        )}
      </div>

      <div className="filter-box">
        <button
          className="filter-box-btn"
          onClick={handleaAllButtonClick}
        >
          <img src={all} alt="" className="filter-images" />
          <h3 className="filter-names">All</h3>
        </button>

        <button
          className="filter-box-btn"
          onClick={handleMedicalButtonClick}
        >
          <img src={mimage} alt="" className="filter-images" />
          <h3 className="filter-names">Medical</h3>
        </button>

        <button
          className="filter-box-btn"
          onClick={handleFruitsButtonClick}
        >
          <img src={fimage} alt="" className="filter-images" />
          <h3 className="filter-names">Fruits</h3>
        </button>

        <button
          className="filter-box-btn"
          onClick={handleWorldbuttonclick}
        >
          <img src={wimage} alt="" className="filter-images" />
          <h3 className="filter-names">World</h3>
        </button>

        <button
          className="filter-box-btn"
          onClick={handleScienceButtonClick}
        >
          <img src={simage} alt="" className="filter-images" />
          <h3 className="filter-names">Science</h3>
        </button>

        <button
          className="filter-box-btn"
          onClick={handleSportsButtonClick}
        >
          <img src={game} alt="" className="filter-images" />
          <h3 className="filter-names">Sports</h3>
        </button>
      </div>

      {isLoggedIn ? (
        <YourStroy userId={userId} isLoggedIn={isLoggedIn} />
      ) : null}

      {showFilter.all && (
        <p className="filter-heading">Top Stories About All</p>
      )}
      {showFilter.all && <All />}

      {showFilter.fimage && (
        <p className="filter-heading">Top Stories About Fruits</p>
      )}
      {showFilter.fimage && <Fruits />}

      {showFilter.mimage && (
        <p className="filter-heading">Top Stories About Medical</p>
      )}
      {showFilter.mimage && <Medical />}

      {showFilter.wimage && (
        <p className="filter-heading">Top Stories About World</p>
      )}
      {showFilter.wimage && <World />}

      {showFilter.simage && (
        <p className="filter-heading">Top Stories About Science</p>
      )}
      {showFilter.simage && <Science />}

      {showFilter.game && (
        <p className="filter-heading">Top Stories About Sports</p>
      )}
      {showFilter.game && <Sports />}

      <Trending />
    </div>
  );
};

export default Home;
