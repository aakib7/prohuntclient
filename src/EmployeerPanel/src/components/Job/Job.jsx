import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, styled, Divider } from "@mui/material";
import JobCard from "./JobCard";
import AddIcon from "@mui/icons-material/Add";
import JobForm from "./JobForm";
import axios from "axios";
import FullPageLoading from "../../../../components/others/FullPageLoading";

const Job = () => {
  const [jobs, setJobs] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const fetchJobs = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setLoading(true);
    axios
      .get(`http://localhost:4000/user/jobs`, config)
      .then((response) => {
        setLoading(false);

        setJobs(response.data.jobs);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h4">Jobs</Typography>
      </Box>
      <Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && <FullPageLoading />}
          {!loading && jobs?.length <= 0 && (
            <Typography variant="h6">
              No Jobs Added Please Add New Jobs
            </Typography>
          )}
        </Box>

        {jobs?.length <= 0 ? (
          ""
        ) : (
          <>
            {jobs?.map((job) => {
              return (
                <>
                  <JobCard
                    title={job.title}
                    description={job.description}
                    id={job._id}
                  />

                  <Divider sx={{ width: "95%" }} />
                </>
              );
            })}
          </>
        )}
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "30px",
          height: "45px",
        }}
      >
        <StyledButton
          onClick={() => {
            setOpen((pre) => !pre);
          }}
          startIcon={<AddIcon />}
        >
          Add New Job
        </StyledButton>
      </Box>
      <JobForm open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </Box>
  );
};

export default Job;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: green;
  }
`;
