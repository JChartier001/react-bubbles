import React, { useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({colors, updateColors}) => {
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor)
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(response=> {      
          axiosWithAuth()
          .get('http://localhost:5000/api/colors')
          .then(response => {      
          updateColors(response.data)
          })
          .catch(error => {
            console.log(error)
          })
          })      
    .catch(error => {
      console.log(error)
    })    
  };

  const addNewColor = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors/`, newColor)
    .then(response=> {     
      console.log(response) 
          axiosWithAuth()
          .get('http://localhost:5000/api/colors')
          .then(response => {      
          updateColors(response.data)
          })
          .catch(error => {
            console.log(error)
          })
          })      
    .catch(error => {
      console.log(error)
    })    
  };

  const deleteColor = (colors) => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${colors.id}`)
    .then(response => {
        axiosWithAuth()
        .get('http://localhost:5000/api/colors')
        .then(response => {      
        updateColors(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div 
      // className="spacer"
       />
      {/* stretch - build another form here to add a color */}
      <h2>Add New Color</h2>
      <form onSubmit={addNewColor}>
      <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <button type="submit">Save</button>
          </form>
    </div>
  );
};

export default ColorList;
