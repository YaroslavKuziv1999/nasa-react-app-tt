import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Image from "material-ui-image";
import Button from "@material-ui/core/Button";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(4);

  const [values, setValue] = useState({
    rover: "Curiosity",
    camera: "FHAZ",
    sol: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue({
      ...values,
      [name]: value,
    });
  };

  const handleLoad = () => {
    setIndex((prev) => {
      if (items.photos.length - 1 >= index) {
        return prev + 4;
      } else {
        return 4;
      }
    });
  };

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${values.rover}/photos?sol=${values.sol}&camera=${values.camera}&api_key=bjUmLB70P9Rm9rF0hBxTtC6Ir4o5kVCSyvZ1Dmzu`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [values.rover, values.sol, values.camera]);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded || items.length === 0) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <Container maxWidth="xl">
        <Typography variant="h3" gutterBottom>
          Test Task for Clover Dynamics
        </Typography>
        <Grid container spacing={3}>
          <Grid item>
            <RadioGroup
              aria-label="rover"
              value={values.rover}
              name="rover"
              onChange={handleChange}
            >
              <FormControlLabel
                value="Curiosity"
                control={<Radio color="primary" />}
                label="Curiosity"
              />
              <FormControlLabel
                value="Opportunity"
                control={<Radio color="primary" />}
                label="Opportunity"
              />
              <FormControlLabel
                value="Spirit"
                control={<Radio color="primary" />}
                label="Spirit"
              />
            </RadioGroup>
          </Grid>
          <Grid item>
            <TextField
              id="standard-basic"
              name="sol"
              label="Sol"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputLabel id="demo-simple-select-label">Camera</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.camera}
              name="camera"
              onChange={handleChange}
            >
              <MenuItem value="FHAZ">FHAZ</MenuItem>
              <MenuItem value="RHAZ">RHAZ</MenuItem>
              <MenuItem value="MAST">MAST</MenuItem>
              <MenuItem value="CHEMCAM">CHEMCAM</MenuItem>
              <MenuItem value="MAHLI">MAHLI</MenuItem>
              <MenuItem value="MARDI">MARDI</MenuItem>
              <MenuItem value="NAVCAM">NAVCAM</MenuItem>
              <MenuItem value="PANCAM">PANCAM</MenuItem>
              <MenuItem value="MINITES">MINITES</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <GridList cellHeight="auto" cols={2} spacing={10}>
          {items.photos.slice(0, index).map((val) => (
            <GridListTile key={val.id} cols={1} rows={2}>
              <Image src={val.img_src} />
            </GridListTile>
          ))}
        </GridList>
        {items.photos.length !== 0 ? (
          <Grid
            container
            style={{ justifyContent: "center", paddingTop: "1%" }}
          >
            <Button variant="contained" color="primary" onClick={handleLoad}>
              Load More...
            </Button>
          </Grid>
        ) : null}
      </Container>
    );
  }
}

export default App;
