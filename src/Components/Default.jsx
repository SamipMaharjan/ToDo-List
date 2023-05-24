import React from 'react'
import { useState, useEffect, useRef, useReducer } from 'react'

export default function Default(props) {

    // For setting the task name 
  const [taskName, setTaskName] = useState([]);

  // For storing the text written in the input 
  const [todoInput, setTodoInput] = useState("Samip");

  // Storing the text written in input to the todoInput. 
  let storingVariable = (event) => {
      setTodoInput(event.target.value);
  }

  // Setting the task in the todo list to the input text 
  let addList = (event) => {
    
    if(event.key === "Enter")
    {
      event.preventDefault();
      setTaskName([...taskName, 
      {
        id: taskName.length+1,
        value: `${todoInput}`,
        checkbox: false
      }]);

      setTodoInput("");
    }

  }

  // delete all tasks 
  let deleteList = () => {
    setTaskName([]);
  }

  const [dropDown, setDropDown] = useState(0);
  // Dropdown Edit 
  const handleDropDown = (event, ID) => {
    event.preventDefault();
    setDropDown(ID);
  };

  // closing menu 
  const theMenu = useRef();

  useEffect(() => {

  const closeEdit = (event) => {
    if(!theMenu.current.contains(event.target))
    {
      setDropDown(0);
    }
  }

    document.addEventListener('mousedown',closeEdit);
    return () => {
      document.removeEventListener('mousedown',closeEdit);
    }
  }, [dropDown]);

//Dropdown menu for editing
  //Delete using Menu
  const optionDelete = (event, ID) => {
    event.preventDefault();
    let newArray = [...taskName];
    newArray.splice(ID - 1, 1);
    setTaskName(newArray);
  }
  //Edit using Menu
  const [editTask, setEditTask] = useState();
  const [storingEdit, setStoringEdit] = useState('');
  
  const optionEdit = (event, ID, value) => {
    event.preventDefault();
    setStoringEdit(value);
    setEditTask(ID);
  }

  const duringEdit = (event) => {
    setStoringEdit(event.target.value);
  }

  // When pressed enter 
  const handleEnter = (event, ID) => {
    // event.preventDefault();
    if(event.key === "Enter")
    {

      taskName.map((items) => {

        if(ID === items.id)
        {
          items.value = storingEdit;
          setEditTask(!editTask);
        }

      })
    }
  }
  //Edit using Menu
//Dropdown menu editing

  // Checkbox and textline
  const toggleCheckbox = (id) => {
    taskName.map(items => {
      if(id === items.id)
      {
        items.checkbox = !(items.checkbox);
      }
    })
  }
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <>
    <section id='todo-block'>

      <div className="heading">
        <h1>To-do</h1>
      </div>
      {/* For Heading  */}
      
      <div className="To-do">

            <div className="tasks">
              <ul>
                {
                  taskName.map(item => (
                  <li key={item.id}>
                    <input type="checkbox" onChange={() => {toggleCheckbox(item.id); forceUpdate();}} id={`checkbox ${item.id}`}></input>
                  {
                    (editTask != item.id) && (
                      <p id={`checkbox-${item.id}`}>
                        {item.checkbox ? <del>{item.value}</del> : item.value}
                      </p>
                    )
                  }

                  {
                    (editTask == item.id) && (
                      <input type="text" value={storingEdit} onChange={duringEdit} onKeyDown={(event) => {handleEnter(event, item.id);}} />
                    )
                  }

                  {/* Edit option  */}
                  <a href="" id={`checkbox-${item.id}`} onClick= {(event) => {event.preventDefault();handleDropDown(event, item.id);}} className="editing">
                    <div className="padding">
                      <span className='dot'> </span>
                      <span className='dot'> </span>
                      <span className='dot'> </span>
                    </div>
                  </a>

                  {/* The Dropdown menu  */}
                  {dropDown === item.id && (
                    <div ref={theMenu} className="dropdown">
                      <ul>

                        {/* Edit  */}
                        <li>
                          <a href="" onClick={(event) => {optionEdit(event, item.id, item.value)}}>Edit</a>
                        </li>
                        
                        {/* Delete  */}
                        <li>
                          <a href='' onClick={(event) => {optionDelete(event, item.id)}}>Delete</a>
                        </li>

                      </ul>
                    </div>
                  )}
                  </li>
                  ))
                } 
              </ul>
            </div>
            {/* Task Section  */}

            <div className="input">
              <input type="text" placeholder="Task" onChange={storingVariable} onKeyDown={addList} value={todoInput}/>

              <button id="button" type="button" className="button"  onClick={deleteList} >Clear all</button>
            </div>
            {/* Input Section  */}

      </div>
      {/* The whole todo list  */}

    </section>
    </>
  )
}