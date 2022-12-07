import { Searchbar } from "../../components/searchbar/Searchbar.jsx";
import { Card } from "../../components/card/Card";
import './Home.css';
import { useEffect, useState } from "react";
import { Spinner } from "../../components/spinner/Spinner.jsx";

import mockProductsData from '../../mock/products.json'

function Home() {
  const [data, setData] = useState(mockProductsData);
  const [searchTags, setSearchTags] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTags.length === 0) setData(mockProductsData);
    else {
      const result = searchTags.reduce((acc = [], currentTag) => {
        const result = mockProductsData.filter(e => e.name.toLocaleLowerCase().includes(currentTag.toLocaleLowerCase()));
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

  const handleDeleteTag = (index) => setSearchTags(prevValue => prevValue.filter((_, i) => i !== index))

  return (
    <div className="main-container">
      <div className="home-container">
        <div className="home-searchbar">
          <Searchbar onSearch={handleSearch} />
        </div>
        <div className="home-search-tag-container">
          {
            searchTags.length > 0 ? searchTags.map((tag, index) => <div key={`${tag}_${index}`} className="home-search-tag">
              <span>{tag}</span>
              <button onClick={() => handleDeleteTag(index)} className='home-delete-button'>x</button>
            </div>) : null
          }
        </div>
        {loading ? <Spinner /> :
          <div className="home-cards">
            {data.map((e, i) => <div key={`${e.name}_${i}`}>
              <Card name={e.name} code={e.code} img={e.img} price={e.price} />
            </div>)}
          </div>
        }
        {
          loading ?
            null
            :
            <footer className="home-footer">
              <span> {data.length} resultados</span>
            </footer>
        }
      </div>
    </div>
  );
}

export default Home;
