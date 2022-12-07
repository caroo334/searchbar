import { Searchbar } from "../../components/searchbar/Searchbar.jsx";
import { Card } from "../../components/card/Card";
import './Home.css';
import { useEffect, useState } from "react";
import { Spinner } from "../../components/spinner/Spinner.jsx";


const mockdata = [
  {
    "name": "Setup",
    "img": 'https://cdn.pixabay.com/photo/2017/05/11/11/15/workplace-2303851__480.jpg'
  },
  {
    "name": "Auriculares",
    "img": 'https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983__480.jpg'
  },
  {
    "name": "Teclado Gamer",
    "img": 'https://cdn.pixabay.com/photo/2016/03/10/09/24/typewriter-1248088__480.jpg'
  }
]

function Home() {
  const [data, setData] = useState(mockdata);
  const [searchTags, setSearchTags] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTags.length === 0) setData(mockdata);
    else {
      const result = searchTags.reduce((acc = [], currentTag) => {
        const result = mockdata.filter(e => e.name.toLocaleLowerCase().includes(currentTag.toLocaleLowerCase()));
        acc = [...new Set([...acc, ...result])]

        return acc;
      }, [])

      setData(result)
    }
  }, [searchTags])

  const handleSearch = (searchValue) => {
    setLoading(true)
    setTimeout(() => {
      if (searchValue) {
        const tags = [...new Set([...searchTags, ...searchValue.split(' ')])];
        setSearchTags(tags)
      }
      setLoading(false);
    }, 2000);
  }

  const handleDeleteTag = (e) => {
    e.preventDefault();
    setSearchTags(prevValue => prevValue.filter(tag => !tag === e.target.value))
  }


  return (
    <div className="home-container">
      <div className="home-searchbar">
        <Searchbar onSearch={handleSearch} />
      </div>
      <div className="home-search-tag-container">
        {
          searchTags.length > 0 ? searchTags.map((e, i) => {
            return (
              <div key={`${e}_${i}`} className="home-search-tag">
                <span >{e}</span>
                <button onClick={(e) => handleDeleteTag(e)} className='home-delete-button'>x</button>
              </div>
            )
          }) : null
        }
      </div>
      {loading ? <Spinner /> :
        <div className="home-cards">
          {data.map((e, i) => {
            return (
              <div key={`${e.name}_${i}`}>
                <Card description={e.name} img={e.img} />
              </div>
            )
          })}
        </div>
      }
      {loading ? null :
        <footer className="home-footer">
          <span> {data.length} resultados</span>
        </footer>}
    </div>
  );
}

export default Home;
