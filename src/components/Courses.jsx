/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState(1);
  const [rating, setRating] = useState(null);
  const [total, setTotal] = useState();

  const getData = () => {
    axios
      .get("https://testcourseapi.herokuapp.com/api/courses/", {
        method: "GET",
        params: {
          page,
          sortBy,
          order,
          rating,
        },
      })
      .then(({ data }) => {
        setCourses(data.courses);
        setTotal(data.total);
      });
  };
  useEffect(() => {
    getData();
  }, [page, sortBy, order, rating, params]);
  useEffect(() => {
    setParams({
      page,
      sortBy,
      order,
      rating,
    });
    return () => {
      setParams({});
    };
  }, [page, sortBy, order, rating, setParams]);

  return (
    <div>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Not Selected</option>
        <option value="title">title</option>
        <option value="rating">rating</option>
      </select>
      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>
      <select onChange={(e) => setRating(e.target.value)}>
        <option value="">Not Selected</option>
        <option value="20">less then 20</option>
        <option value="40">less then 40</option>
        <option value="60">less then 60</option>
        <option value="80">less then 80</option>
      </select>

      <button
        disabled={page === Math.ceil(total / 5)}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>

      {courses ? (
        courses.map((course) => (
          <div key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>{course.rating}</p>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
