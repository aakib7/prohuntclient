import React, { useEffect, useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import image from "../../assests/images/main-banner1.jpg";
import SingleJobCard from "../cards/SingleJobCard";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
const JobList = () => {
  const { subcategory } = useParams();
  const [jobs, setJobs] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchCategories() {
      setLoading(true);
      axios
        .get("/jobs?category=" + subcategory)
        .then((response) => {
          setJobs(response.data.Jobs);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
    fetchCategories();
  }, []);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          mt: 7,
          width: "100%",
          paddingX: "3%",
        }}
      >
        <Grid container spacing={2}>
          {!loading && jobs.length == 0 && <h1>No Jobs</h1>}
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            jobs.map((job) => (
              <>
                <Grid item xs={12} md={6} lg={4}>
                  <Link
                    to={`/job/${job._id}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    <SingleJobCard
                      title={job.title}
                      imgage={image}
                      avatar={image}
                      price={job.price}
                      author={`${job.owner.firstName} ${job.owner.lastName}`}
                      rating={job.rating}
                    />
                  </Link>
                </Grid>
              </>
            ))
          )}
        </Grid>
      </Box>
      {jobs?.length >= 12 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Box>
      )}
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
