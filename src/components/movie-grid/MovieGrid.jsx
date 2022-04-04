import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import './movie-grid.scss';
import MovieCard from '../movie-card/MovieCard';

import Button, { OutlineButton } from '../button/Button';
import Input from '../input/input';
import tmdApi, { category, movieType, tvType } from '../../api/tmdbApi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const MovieGrid = props => {

const [items, setItems] = useState([]);

const [page, setPage] = useState(1);

const [totalPage, setTotalPage] = useState(0);
const { keyword } = useParams();

useEffect(() => {
  const getList = async () => {
      let response = null;

      if(keyword === undefined) {
     const params = {};
        switch(props.category) {
             case category.movie:
                 response = await tmdApi.getMovieList(movieType.upcoming, {params});
                 break;
                 default:
                    response = await tmdApi.getTvList(tvType.popular, {params});
                    

        }

      } else {
          const params = {
              query: keyword
          }
          response = await tmdApi.search(props.category, {params});

      }
      setItems(response.results);
      setTotalPage(response.total_pages);
  }
  getList();

}, [props.category, keyword]);
 

    const loadMore =  async () => {
        let response = null;

      if(keyword === undefined) {
     const params = {
         page: page + 1
     };
        switch(props.category) {
             case category.movie:
                 response = await tmdApi.getMovieList(movieType.upcoming, {params});
                 break;
                 default:
                    response = await tmdApi.getTvList(tvType.popular, {params});
                    

        }

      } else {
          const params = {
              page: page + 1,
              query: keyword
          }
          response = await tmdApi.search(props.category, {params});

      }
      setItems([...items, ...response.results]);
         setPage(page + 1);   
 }

  return (
      <>
      <div className="section mb-3">
          <MovieSearch category={props.category} keyword={keyword}/>
      </div>
    <div className="movie-grid">
        {
            items.map((items, i) => <MovieCard category={props.category} item={items} key={i}/>)
        }
        </div>
        {
            page < totalPage ? (
                 <div className="movie-grid__loadmore">
                     <OutlineButton className="small" onClick={loadMore}>Load More</OutlineButton>
                 </div>
            ): null
        }
</>  
  )

}

const MovieSearch = props => {

    const history = useHistory();
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword: '');
    const goToSearch = useCallback(
    () => {
        if(keyword.trim().length > 0) {
            history.push(`${category[props.category]}/search/${keyword}`);
        }
      },
      [keyword, props.category, history],
    );

    useEffect(() => {
      const enterEvent = (e) => {
          e.preventDefault();
          if(e.keyCode === 13) {
              goToSearch();
          }
      }
      document.addEventListener('keyup', enterEvent);
    
      return () => {
        document.removeEventListener('keyup', enterEvent);
      }
    }, [keyword, goToSearch]);
    
    
    return (
    <div className="movie-search">
        <Input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          />
          <Button className="small" onClick={goToSearch}>SEARCH</Button>
          
    </div>
  
    
    )
}
 
export default MovieGrid;