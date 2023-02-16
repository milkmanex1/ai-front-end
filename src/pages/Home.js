import React, { useState, useEffect } from "react";
import { Loader, Card, FormField, ImageModal } from "../components";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  //   console.log(process.env.REACT_APP_API);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        //call our Get image route
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/v1/post`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          console.log("get image successfully");
          const result = await response.json();
          setAllPosts(result.data.reverse());
        } else {
          console.log("failed to get image");
        }
      } catch (err) {
        console.log("got error");
        alert(err);
        alert(
          "please wait a few minutes and then reload the page. This error is due to the hosting server loading slowly."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log(allPosts);
  }, [allPosts]);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      //   return data.map((post, i) => <Card key={i} {...post}></Card>);
      return data.map((post, i) => <ImageModal key={i} {...post}></ImageModal>);
    } else {
      return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
          {title}
        </h2>
      );
    }
  };

  function handleSearchChange(e) {
    setSearchText(e.target.value);
    //kind of like debounce
    setSearchTimeout(
      setTimeout(() => {
        const filteredResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(filteredResults);
      }, 500)
    );
  }
  return (
    <section className="max-w-[80rem]">
      {/*----------------- title--------------- */}
      <div>
        <h1 className="font-extrabold text-black text-2xl">
          The Community Showcase
        </h1>
        <p className="mt-2 text-slate-500 text-md w-[500px] md:w-auto ">
          Browse through a collection of imaginative and visually stunning
          images generated by our amazing A-Image Engine.
        </p>
      </div>

      {/* -----------formfield -----------------------*/}
      <div className="mt-10">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        ></FormField>
      </div>

      {/* ---------------- images----------------- */}
      <div className="mt-10">
        {loading ? (
          <div>
            <Loader></Loader>
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-md text-gray-500">
                Showing results for
                <span className="text-black ml-2">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchResults}
                  title="No search results found"
                ></RenderCards>
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No posts found"
                ></RenderCards>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
