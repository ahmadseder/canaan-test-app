import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Rules from "./Demo.json";
import Entries from "./Entries";
import AppBar from "./AppBar";
import "./services";

import "./App.css";
import {
  startDevTools,
  initializeRulesEngine,
} from "@canaan_run/canaan";
import { useEffect, useState } from "react";
import {
  initializeProjects,
  selectProject,
  projectsApp,
  getSelectedProject,
  addEntry,
  initUser,
  getBalance,
  getUserInfo,
  getProjects
} from "./CQRS";

import { Grid, Typography } from "@mui/material";
import { generateUserInfo, generatePorjectsData } from "./utils";




function App() {
  const [selectedProject, setSelectedProject] = useState();
  const [balance, setBalance] = useState(0); 
  const [data, setData] = useState({
    number: "",
    details: "",
    project: "",
  });

  useEffect(() => {
    startDevTools();
    
    initializeRulesEngine(Rules);
    initUser(generateUserInfo());
    initializeProjects(generatePorjectsData());

    projectsApp.subscribe(getSelectedProject, (current, previous) => {
      setSelectedProject(current);
    });

    projectsApp.subscribe(getBalance, (current, previous) => {
      setBalance(current); 
    });
  }, []);
  const {name, subscriptionType} = getUserInfo(); 
  return (
    <>
      <AppBar name={name} plan={subscriptionType} />
      <div className="App">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Create a new work log entry
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={getProjects()}
                  blurOnSelect
                  value={data?.id}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Project Name" />
                  )}
                  onChange={(event, value) => {
                    selectProject(value);
                    setData({
                      ...data,
                      project: value?.id,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {selectedProject && (
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={`Number of ${selectedProject?.calculationType}s`}
                    variant="outlined"
                    type="number"
                    value={data?.number}
                    onChange={(e) => {
                      setData({
                        ...data,
                        number: e.target.value,
                      });
                    }}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                {selectedProject && (
                  <TextField
                    fullWidth
                    id="standard-multiline-static"
                    label="Details"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={data?.details}
                    onChange={(e) => {
                      setData({
                        ...data,
                        details: e.target.value,
                      });
                    }}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                {selectedProject && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      if(!data?.number)
                      {
                        alert("Please enter a number ")
                        return; 
                      }
                      addEntry({
                        ...data,
                        ...selectedProject,
                      });
                    }}
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4">Work log</Typography>
              </Grid>
              <Grid item xs={6}>
                  <Typography variant="h4">Balance: ${balance}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Entries />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
