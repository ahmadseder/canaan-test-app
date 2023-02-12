import { faker } from "@faker-js/faker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Rules from "./Demo.json";
import Entries from "./Entries";
import AppBar from "./AppBar";
import "./services";

import "./App.css";
import { startDevTools, initializeRulesEngine } from "@canaan_run/canaan";
import { useEffect, useState } from "react";
import {
  initializeProjects,
  selectProject,
  projectsApp,
  getSelectedProject,
  clearForm,
  form,
  addEntry,
  initUser,
  getBalance,
} from "./Repo";

import { Grid, Typography } from "@mui/material";

let currentUser = {
  userId: faker.datatype.uuid(),
  username: faker.internet.userName(),
  name: faker.name.fullName(),
  role: faker.helpers.arrayElement([
    "fresh",
    "junior",
    "mid",
    "senior",
    "principal",
    "architect",
    "any",
  ]),
  subscriptionType: faker.helpers.arrayElement(["Free", "Starter", "Premium"]),
};

initUser(currentUser);

let dataFake = [];
for (let i = 0; i < 15; i++) {
  dataFake.push({
    label: faker.company.name(),
    id: faker.datatype.uuid(),
    isVolunteering: faker.helpers.arrayElement(["true", "false"]),
    calculationType: faker.helpers.arrayElement(["hour", "task", "storyPoint"]),
    authorizedRole: faker.helpers.arrayElement([
      "fresh",
      "junior",
      "mid",
      "senior",
      "principal",
      "architect",
      "any",
    ]),
  });
}
initializeProjects(dataFake);

form.listen(selectProject.commandName);

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
    projectsApp.subscribe(getSelectedProject, (current, previous) => {
      setSelectedProject(current);
    });

    projectsApp.subscribe(getBalance, (current, previous) => {
      setBalance(current);
    });

    form.onCommand((data) => {
      const { type, payload } = data;
      if (
        type === selectProject.commandName ||
        type === clearForm.commandName
      ) {
        setData({
          number: "",
          details: "",
          project: payload?.id || "",
        });
      }
    });
  }, []);

  return (
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
          options={dataFake}
          blurOnSelect
          value={data?.id}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="Project Name" />
          )}
          onChange={(event, value) => {
            selectProject(value);
            clearForm();
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
              if (!data?.number) {
                alert("Please enter a number ");
                return;
              }
              addEntry({
                ...data,
                ...selectedProject,
              });
              clearForm();
            }}
          >
            Save
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
