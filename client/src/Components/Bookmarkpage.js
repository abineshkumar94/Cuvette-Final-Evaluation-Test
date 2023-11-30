import styles from "./bookmarkpage.module.css";
import Bookmarkicon from "../Image/bookmark-icon.png";
import Propic from "../Image/propic.svg";
import Hamburgericon from "../Image/Ham.svg";
import AddStories from "./storiesmodal/AddStoriesModal";
import Logout from "./Logout";

import React, { useEffect, useState } from "react";
import filters from "./common.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
const Bookmarkpage = () => {
  const navigate = useNavigate();
  const initialVisibleImages = 4;
  const [stories, setStories] = useState();
  const [visibleImages, setVisibleImages] = useState(initialVisibleImages);
  const [StoriesModal, setStoriesModal] = useState(false);
  const [LogoutModal, setLogoutModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { id } = useParams();
  const userId = id;

  const backendUrl = `https://wild-blue-crayfish-tutu.cyclic.app/api/v1/stories/bookmarkedStories/${userId}`;

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(backendUrl);
        const data = result.data;
        console.log(data);
        if (data.success) {
          setStories(data.bookmarkedStories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const processSeeMoreClick = () => {
    setVisibleImages(visibleImages + 4);
  };

  const manageModelOpen = () => {
    setStoriesModal(StoriesModal ? false : true);
  };

  const handleHamButtonClick = () => {
    setLogoutModal(true);
    setIsLoggedIn(false);
    setStories([]);
    navigate("/bookmark/null");
  };

  const manageHomePageNavigation = () => {
    navigate("/");
  };

  const manageStoryPage = (e) => {
    const storyId = e.target.getAttribute("id");
    console.log(e.target.getAttribute("id"));
    navigate(`/individualstory/${storyId}`);
  };

  return (
    <div className={styles.bookmarkHeader}>
      {isLoggedIn ? (
        <>
          <button className={styles.addStoryBtn} onClick={manageModelOpen}>
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
        </>
      ) : (
        <>
          <button
            className={styles.addStoryBtn}
            onClick={manageHomePageNavigation}
          >
            Home page
          </button>
        </>
      )}
      <h3 className={styles.bookmarkSwip}>SwipTory</h3>

      <>
        {LogoutModal ? <Logout parent={"bookmark"} /> : null}
        {StoriesModal && (
          <AddStories setStoriesModal={setStoriesModal} userId={userId} />
        )}
        <h1 className={styles.yourStoryHeading}>Your Bookmarks</h1>
        {stories && stories.length === 0 ? (
          <h1 className={styles.noMorestories}>No stories are available</h1>
        ) : (
          <div className={filters.container}>
            {stories &&
              stories.length > 0 &&
              stories.slice(0, visibleImages).map((story) => {
                return (
                  <div
                    id={story._id}
                    onClick={manageStoryPage}
                    className={`${filters.storycontainer} ${filters.background} ${filters.container}`}
                    style={{
                      backgroundImage: `url(${
                        story.slides &&
                        story.slides[0] &&
                        story.slides[0].image &&
                        story.slides[0].image.url
                      })`,
                    }}
                  >
                    <div className={filters.wrappered}>
                      <h3 className={filters.heading}>
                        {story.slides &&
                          story.slides[0] &&
                          story.slides[0].heading}
                      </h3>
                      <p className={filters.decsription}>
                        {story.slides &&
                          story.slides[0] &&
                          story.slides[0].description}
                      </p>
                    </div>
                  </div>
                );
              })}

            {stories && stories.length > visibleImages && (
              <button
                className={filters.seeMoreBtn}
                onClick={processSeeMoreClick}
              >
                See more
              </button>
            )}
          </div>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </>
    </div>
  );
};

export default Bookmarkpage;
