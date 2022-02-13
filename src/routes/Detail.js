import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setDetail(json.data.movie);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div>
      <h1>Movie Details</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>{detail.title_long}</h2>
          <h4>
            ★ {detail.rating} ♥ {detail.like_count}
          </h4>
          <h4>
            Language : {detail.language}
            <br />
            Runtime : {detail.runtime} minutes
          </h4>
          <p>{detail.description_full}</p>
        </div>
      )}
    </div>
  );
}
export default Detail;
