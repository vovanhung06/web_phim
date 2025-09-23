
import Index from "../components/FeatureMovies/Index";
import MediaList from "../components/MediaList";
import { TOP_RATED_TYPES, TRENDING_TYPES } from "../components/MediaList/libs";

function HomePage() {

  return (
    <div>
      <Index/>
      <MediaList title={'Trending'} types={TRENDING_TYPES}/>
      <MediaList title={'Top rated'} types={TOP_RATED_TYPES}/>
    </div>
  );
}

export default HomePage;
