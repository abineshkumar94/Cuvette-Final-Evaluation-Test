import filters from "./common.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const World = () => {
  const navigate = useNavigate();
  const initialVisibleImages = 4;
  const [stories, setStories] = useState([]);
  const [visibleImages, setVisibleImages] = useState(initialVisibleImages);

  const backendUrl = `https://wild-blue-crayfish-tutu.cyclic.app/api/v1/stories/filteredStories`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(backendUrl, {
          category: "World",
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
  }, []);

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
        <h1 className={filters.NoMoreStories}>No stories are available</h1>
      ) : (
        <>
          <div className={filters.container}>
            {stories &&
              stories.length > 0 &&
              stories.slice(0, visibleImages).map((story) => {
                return (
                  <div
                    id={story._id}
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
          </div>
        </>
      )}
    </>
  );
};

export default World;
