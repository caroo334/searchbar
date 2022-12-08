import { Searchbar } from "../../components/searchbar/Searchbar.jsx";
import { Card } from "../../components/card/Card";
import "./Home.css";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/spinner/Spinner.jsx";
import { products } from "../../mock/products";
import { Tag } from "../../components/tag/Tag";
import { Footer } from "../../components/footer/Footer.jsx";

function Home() {
  const [data, setData] = useState(products);
  const [searchTags, setSearchTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTags.length === 0) setData(products);
    else {
      const result = searchTags.reduce((acc = [], currentTag) => {
        const result = products.filter(
          (e) =>
            e.name
              .toLocaleLowerCase()
              .includes(currentTag.toLocaleLowerCase()) ||
            e.code.toLocaleLowerCase().includes(currentTag.toLocaleLowerCase())
        );
        acc = [...new Set([...acc, ...result])];

        return acc;
      }, []);

      setData(result);
    }
  }, [searchTags]);

  const handleSearch = (searchValue) => {
    setLoading(true);
    setTimeout(() => {
      if (searchValue) {
        const tags = [...new Set([...searchTags, ...searchValue.split(" ")])];
        setSearchTags(tags);
      }
      setLoading(false);
    }, 2000);
  };

  const handleDeleteTag = (index) =>
    setSearchTags((prevValue) => prevValue.filter((_, i) => i !== index));

  return (
    <div className="main-container">
      <div className="home-container">
        <Searchbar onSearch={handleSearch} />
        <div className="home-search-tag-container">
          {searchTags.length > 0
            ? searchTags.map((tag, index) => (
                <Tag
                  key={`${tag}-${index}`}
                  tag={tag}
                  onClick={() => handleDeleteTag(index)}
                />
              ))
            : null}
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="home-cards">
            {data.map((e, i) => (
              <div key={`${e.name}_${i}`}>
                <Card name={e.name} code={e.code} img={e.img} price={e.price} />
              </div>
            ))}
          </div>
        )}
        {loading ? null : <Footer count={data.length} />}
      </div>
    </div>
  );
}

export default Home;
