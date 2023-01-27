import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import image from "../../assests/images/main-banner1.jpg";
import SingleJobCard from "../cards/SingleJobCard";
import axios from "axios";
import FilterButton from "../SubCategories/FilterButton";
import FullPageLoading from "../others/FullPageLoading";
const JobList = ({ search }) => {
  const { subcategory } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    function fetchCategories() {
      setLoading(true);
      const url = `http://localhost:4000/jobs?category=${subcategory}&search=${search}`;
      axios
        .get(url)
        .then((response) => {
          setJobs(response.data.Jobs);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    }
    fetchCategories();
  }, [search]);
  const minprice = () => {
    const numDescending = [...jobs].sort((a, b) => b.price - a.price);
    setJobs(numDescending);
  };
  const maxprice = () => {
    const numDescending = [...jobs].sort((a, b) => a.price - b.price);
    setJobs(numDescending);
  };
  return (
    <Box>
      {loading && (
        <Box>
          <FullPageLoading />
        </Box>
      )}
      {!loading && error && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography>Somthing happend bad try again Later</Typography>
        </Box>
      )}
      {!loading && jobs?.length <= 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography>No Jobs To show</Typography>
        </Box>
      )}
      <Box
        sx={{
          marginRight: "30px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <FilterButton onClick={minprice} onClick1={maxprice} />
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: 7,
          width: "100%",
          paddingX: "3%",
        }}
      >
        <Grid container spacing={2}>
          {jobs?.map((job) => (
            <>
              {console.log(job.image.url)}
              <Grid item xs={12} md={6} lg={4}>
                <Link
                  to={`/job/${job._id}`}
                  style={{ textTransform: "capitalize" }}
                >
                  <SingleJobCard
                    title={job.title}
                    image={"http://localhost:4000/" + job?.image?.url}
                    avatar={image}
                    price={job.price}
                    author={`${job.owner?.firstName} ${job.owner?.lastName}`}
                    rating={job.rating ? job.rating : 0}
                  />
                </Link>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default JobList;
// const StyledButton = styled(Button)`
//   background-color: #f2a71b;
//   color: #fff;
//   &:hover {
//     background-color: #025e73;
//   }
// `;
