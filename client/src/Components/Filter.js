import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import filters from "./filters.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Filter = ({ category }) => {
  const navigate = useNavigate();
  const initialVisibleImages = 4;
  const [stories, setStories] = useState([]);
  const [visibleImages, setVisibleImages] = useState(
    initialVisibleImages
  );
 

  const backendUrl = `https://swip-troy-backend.vercel.app/api/v1/stories/filteredStories`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(backendUrl, {
          category: `${category}`,
        });
        if (result.data.success) {
          setStories(result.data.filteredStories);
        } else {
          toast.error("error in filters");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [stories]);

  const handleSeeMoreClick = () => {
    setVisibleImages(visibleImages + 4);
  };

  const individualStoryPage = (e) => {
    const storyId = e.target.getAttribute("id");
    console.log(e.target.getAttribute("id"));
    navigate(`/individualstory/${storyId}`);
  };

  return (
    <>
      {stories && stories.length === 0 ? (
        <h3 className={filters.NoMoreStories}>No stories are available</h3>
      ) : (
        <>
          {stories &&
            stories.length > 0 &&
            stories.slice(0, visibleImages).map((story) => {
              return (
                <div
                  onClick={individualStoryPage}
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
                >
                  {console.log(story._id)}
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
                        {story.slides &&
                          story.slides[0] &&
                          story.slides[0].heading}
                      </h3>
                      <p
                        className={filters.decsription}
                        id={story._id}
                        onClick={individualStoryPage}
                      >
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
              onClick={handleSeeMoreClick}
            >
              See more
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Filter;
