import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, Typography } from "@mui/material";
import "./App.css";
import Entries from "./Entries";
import AppBar from "./AppBar";
import { generateUserInfo, generatePorjectsData } from "./utils";
import { updateUserInfo, updateProjects, getProjects, projects as projectsDomain, user as userDomain, getUserInfo, getBalance, addEntry, getEntries} from './CQRS';
import "./services";
import rules from './Demo.json';

import { initializeRulesEngine, startDevTools } from "@canaan_run/canaan";

function App() {
  const [selectedProject, setSelectedProject] = useState();
  const [user, setUser] = useState({});
  const [projects, setProjects ] = useState([]); 
  const [entries,setEntries] = useState([]);
  const [balance, setBalance] = useState(0); 
  const [data, setData] = useState({
    number: "",
    details: "",
    project: "",
  });

  useEffect(() => {
    startDevTools();
    initializeRulesEngine(rules);
    updateProjects(generatePorjectsData());
    updateUserInfo(generateUserInfo());
    projectsDomain.subscribe(getProjects, setProjects);
    userDomain.subscribe(getUserInfo, setUser);
    projectsDomain.subscribe(getBalance, setBalance);
    projectsDomain.subscribe(getEntries,setEntries);
    
  }, []);
  const {name, subscriptionType} = user; 
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
                  options={projects}
                  blurOnSelect
                  value={data?.id}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Project Name" />
                  )}
                  onChange={(event, value) => {
                    setSelectedProject(value);
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
                      addEntry({
                        label: selectedProject.label,
                        number: data.number, 
                        details: data.details,
                        isVolunteering: selectedProject.isVolunteering,
                        type: selectedProject.calculationType,
                      });
                      if(!data?.number)
                      {
                        alert("Please enter a number ")
                        return; 
                      }
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
                <Entries entries={entries} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
