import React, { useState } from "react";

import { Button, Form, Grid, Segment } from "semantic-ui-react";

export default function AddForm(props) {
  const [selectedFile, setSelectedFile] = useState("");
  const [state, setState] = useState({
    caption: "",
    ingridients: "",
    instructions: "",
  });

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("ingridients" , state.ingridients);
    formData.append("instructions", state.instructions);
    formData.append("caption", state.caption);
    props.handleAddPost(formData);

    // Have to submit the form now! We need a function!
  }

  return (
    <Grid textAlign="center" style={{ height: "40vh" }} verticalAlign="left">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Form.Input
              className="form-control"
              name="caption"
              value={state.caption}
              placeholder="Whats your favs recipe?"
              onChange={handleChange}
              required
            />
            <Form.Input
              className="form-control"
              name="ingridients"
              value={state.ingridients}
              placeholder="ingridients"
              onChange={handleChange}
              required
            />
             <Form.Input
              className="form-control"
              name="instructions"
              value={state.instructions}
              placeholder="instructions"
              onChange={handleChange}
              required
            />
            <Form.Input
              className="form-control"
              type="file"
              name="photo"
              placeholder="upload image"
              onChange={handleFileInput}
            />
            <Button type="submit" className="btn">
              ADD RECIPE
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
