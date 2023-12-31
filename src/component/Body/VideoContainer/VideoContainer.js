import React, { useEffect, useState } from "react";
import "../body.css";
import Videocard from "../Videocard/Videocard.js";
import Shimmer from "../Shimmer/Shimmer";
import { Video_API, Search_API } from "../../../utils/constants";
import { Link } from "react-router-dom";
import {
  getLorems,
  getSearchVideo,
} from "../../../utils/store/features/fetchSlice";
import { useDispatch, useSelector } from "react-redux";


const VideoContainer = () => {
  const [searchText, setSearchText] = useState("");
  const [video, setVideo] = useState([]);
  const dispatch = useDispatch();
  const lorem = useSelector((store) => store.lorem);

  useEffect(() => {
    dispatch(getLorems());
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch(getSearchVideo(event.target.value));
    }
  };

  return lorem.data.length == 0 ? (
    <Shimmer />
  ) : (
    <>
      <div>
        <input
          className="search-bar"
          name="search"
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="body">
        {lorem.data.map((video) => (
          <Link
            to={"/watch?v=" + (video.id.videoId ? video.id.videoId : video.id)}
          >
            <Videocard info={video} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default VideoContainer;
