import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, styled, Button, ButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import TeamAdds from "./TeamAdds";
import Teams from "./Teams";

const Team = () => {
  const { user } = useSelector((state) => state.user);
  const [teamsAdd, setTeamsAdd] = useState(true);
  const [teamsAddData, setTeamsAddData] = useState([]);
  const [team, setTeam] = useState(false);
  const [teamdata, setTeamData] = useState([]);

  const getTeamsAdd = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get(`http://localhost:4000/user/jobs`, config)
      .then((response) => {
        console.log(response.data.jobs);
        setTeamsAddData(response.data.jobs);
      })
      .catch((error) => {
        console.log(error.response.data);
        // setMessage(error.response);
      });
  };
  const getTeams = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get(`http://localhost:4000/order/teamOrder`, config)
      .then((response) => {
        console.log(response.data);
        setTeamData(response.data.orders);
      })
      .catch((error) => {
        console.log(error.response.data);
        // setMessage(error.response);
      });
  };

  useEffect(() => {
    if (teamsAdd && user) {
      getTeamsAdd();
    }
    if (team && user) {
      getTeams();
    }
  }, [teamsAdd, user, team]);
  return (
    <>
      <Box
        style={{
          display: "flex",
        }}
      >
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            onClick={() => {
              setTeamsAdd(true);
              setTeam(false);
            }}
          >
            Teams Add
          </Button>
          <Button
            onClick={() => {
              setTeamsAdd(false);
              setTeam(true);
            }}
          >
            Teams
          </Button>
        </ButtonGroup>
      </Box>

      <Box>{teamsAdd && teamdata && <TeamAdds ads={teamsAddData} />}</Box>
      <Box>{team && <Teams teamdata={teamdata} />}</Box>
    </>
  );
};

export default Team;
