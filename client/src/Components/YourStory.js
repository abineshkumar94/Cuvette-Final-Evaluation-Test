import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import filters from "./filters.module.css";
import EditStories from "./storiesmodal/EditStoriesModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YourStroy = ({ userId, isLoggedIn }) => {
  const navigate = useNavigate();
  const initialVisibleImages = 4;
  const [stories, setStories] = useState();
  const [visibleImages, setVisibleImages] = useState(
    initialVisibleImages
  );
  const [openEditStoriesModal, setOpenEditStoriesModal] = useState(false);
  const [storyId, setStoryId] = useState(null);
  const [statestories, setStateStories] = useState([]);

  const backendUrl = `https://swip-troy-backend.vercel.app/api/v1/stories/userstories/${userId}`;

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(backendUrl);
        const data = result.data;
        if (data.success) {
          setStories(data.userStories);
          console.log(stories);
        } else {
          toast.error("No more stories are avaible");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetch();
  }, [isLoggedIn, userId]);

  const handleSeeMoreClick = () => {
    setVisibleImages(visibleImages + 4);
  };

  const HandleEditModal = (e) => {
    e.stopPropagation();
    setStoryId(e.target.getAttribute("id"));
    setOpenEditStoriesModal(true);
  };

  const individualStoryPage = (e) => {
    const storyId = e.target.getAttribute("id");
    console.log(e.target.getAttribute("id"));
    navigate(`/individualstory/${storyId}`);
  };

  return (
    <>
      <h1 className={filters.yourStoryHeading}>Your stories </h1>

      {stories && stories.length === 0 ? (
        <h1 className={filters.NoMoreStories}>No stories are available</h1>
      ) : (
        <>
          {stories &&
            stories.length > 0 &&
            stories.slice(0, visibleImages).map((story) => {
              return (
                <div
                  className={`${filters.storycontainer} ${filters.background} ${filters.container}`}
                  style={{
                    backgroundImage: `url(${
                      story.slides &&
                      story.slides[0] &&
                      story.slides[0].image &&
                      story.slides[0].image.url
                    })`,
                  }}
                  id={story._id}
                  key={story._id}
                  onClick={individualStoryPage}
                >
                  <div
                    className={filters.wrappered}
                    id={story._id}
                    onClick={individualStoryPage}
                  >
                    <h3
                      className={filters.heading}
                      id={story._id}
                      onClick={individualStoryPage}
                    >
                      {story.slides && story.slides[0].heading}
                    </h3>
                    <p
                      className={filters.decsription}
                      id={story._id}
                      onClick={individualStoryPage}
                    >
                      {story.slides && story.slides[0].description}
                    </p>
                  </div>

                  <button
                    className={filters.editBtn}
                    onClick={HandleEditModal}
                    id={story._id}
                  >
                    Edit <i class="fa-solid fa-pen"></i>
                  </button>
                </div>
              );
            })}
          {openEditStoriesModal ? (
            <EditStories
              setOpenEditStoriesModal={setOpenEditStoriesModal}
              storyId={storyId}
              openEditStoriesModal={openEditStoriesModal}
            />
          ) : null}
          {stories && stories.length > visibleImages && (
            <button
              className={filters.seeMoreBtn}
              onClick={handleSeeMoreClick}
            >
              See more
            </button>
          )}
        </>
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
  );
};

export default YourStroy;
