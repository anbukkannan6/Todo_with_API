import React, { useEffect, useState,useRef } from "react";
import axios from "axios";

// !GET
// !POST
// !PUT
// !DELETE

export default function ToDoComp() {

    // ! Add shake animation

    const [getData, setGetData] = useState("")
    const [showData, setShowData] = useState([])
    const[isVisible,setIsVisible] = useState(false)
    const [id,setId] = useState()
    const[warning,setWarning]  = useState(null)
    const inputRef = useRef(null);

    useEffect(() => {
        handleGet()
    }, [])

    // *GET REQUEST

    const handleGet = async () => {
        const res = await axios.get('https://6582b3bc02f747c83679f31a.mockapi.io/task')
        //    const json = await res.json();
        // .then(res => {
        //     console.log(res);
        //    
        // })
        setShowData(res.data)
        console.log(res);
        console.log("calledddd");
    }



    //* POST REQUEST
    // !if i put a async keyword inside top of function, the code inside the function executed in such a manner that each line of the code executed then move to the next line of the code
    // !The await keyword causes the execution of the function to pause until the promise is resolved

    const handlePost = async () => {
        if(getData==""){
            return setWarning(1)
        }
        const resp = await axios.post("https://6582b3bc02f747c83679f31a.mockapi.io/task", {
            task: getData,
        })
        //    *Always make api call inside async function
        console.log(resp);

        handleGet()
        setGetData("")

        // .then(res => console.log(res))
    }

    //*UPDATE REQUEST

    const handleUpdate = async (id) => {
        const res = await axios.put("https://6582b3bc02f747c83679f31a.mockapi.io/task/" + id, {
            task: getData,
        })
        setGetData("")
        setIsVisible(false)
        handleGet()
    }

    // *DELETE REQUEST

    const handleDelete = async (id) => {
        const res = await axios.delete("https://6582b3bc02f747c83679f31a.mockapi.io/task/" + id)
       

        handleGet()
    }

    const handleToggle = (id)=>{
        if (inputRef.current) {
            inputRef.current.focus();
          }
        setIsVisible(true)
        setId(id)

    }





    return (
        
        // !useRef is used for control the specific element property like focus,,,
        <>
            <input ref={inputRef} value={getData}  onChange={(e) => {
                setGetData(e.target.value)
            }} />
            {isVisible?<button onClick={()=>handleUpdate(id)}>Modify</button>
            :<button onClick={handlePost}>Add Task</button>}
        {warning ==1 ?<p>Please add task</p>:null}
            
            

            {showData.map((e) => (
                <div key={e.id}>
                    <h3>{e.task}</h3>
                    {console.log(e)}
                    {/* <button onClick={() => handleUpdate(e.id)}>Update</button> */}
                    <button onClick={() => handleToggle(e.id)}>Update</button>
                    <button onClick={() => handleDelete(e.id)}>Delete</button>

                </div>
            ))}


        </>
    )
}
