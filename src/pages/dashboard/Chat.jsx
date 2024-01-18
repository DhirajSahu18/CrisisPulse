import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
//   MDBScrollbar,
} from "mdb-react-ui-kit";
import { TypeAnimation } from 'react-type-animation';
import TypingAnimation from "@/widgets/common/Typing";


export default function Chat() {
    const [msg , setmsg] = useState('')
    const [id , setId] = useState(1)
    const [conversation , setConversation] = useState([
        {
        id : 1,
        msg : "Hello"
    },
        {
        id : 2,
        msg : "Hello Sir,How may I Help You ?"
    },
        {
        id : 1,
        msg : "What is the importance of early warning systems in disaster management?"
    },
        {
        id : 2,
        msg : "Early warning systems are crucial in disaster management as they provide timely information about potential disasters, allowing communities to prepare and evacuate. This proactive approach helps minimize loss of life, property damage, and ensures a more effective response."
    },
        {
        id : 1,
        msg : " How can communities enhance resilience in the face of natural disasters?"
    },
        {
        id : 2,
        msg : "Communities can enhance resilience by implementing measures such as building infrastructure to withstand disasters, creating emergency response plans, conducting regular drills, raising awareness, and fostering community collaboration. Building resilience is essential for reducing vulnerability and recovering quickly from disasters."
    },
])
useEffect(()=>{
  fetchData()
},[])

const fetchData = async (msg) => {
  console.log(msg)
  try {
    const response = await fetch('http://127.0.0.1:5000/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if required
      },
      body: JSON.stringify({query : msg}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data received:', data);
    setConversation(prevValue => ([...prevValue , { id : 2 , msg : data.result}]))
    // conversation[conversation.length] = { id : 2 , msg : data.result}
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const handleSend = () =>{
  id===1 ? setId(2) : setId(1);
  if (msg !== '') {
          setConversation(prevValue => ([...prevValue , { id : 1 , msg : msg}]))
            // conversation[conversation.length] = { id : 1 , msg : msg}
        }
        fetchData(msg)
        setmsg('')
    }

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="6">
          <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0 font-extrabold text-2xl">CrisisCompanion</h5>
              <MDBBtn color="primary" size="md" rippleColor="dark">
              Your Trusty Guide in Emergency Situations
              </MDBBtn>
            </MDBCardHeader>
            {/* <MDBScrollbar
              suppressScrollX
              style={{ position: "relative", height: "400px" }}
            > */}
              <MDBCardBody>
                {conversation.map((convo , index)=>(
                    <div className={`flex flex-row justify-content-start my-4 ${convo.id === 1 ? `justify-start flex-row-reverse` : ``}`}>
                    <img
                      src={`${convo.id==1 ? `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp` : `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp`}`}
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                    <p
                        className={`small p-2 ms-3 mb-1 rounded-3 w-fit max-w-[80%] ${convo.id==1 ? `bg-white text-start` : `bg-gray-500`}`}
                      >{((convo.id !== 1) && (index === conversation.length-1)) ?
                        <TypeAnimation
                        sequence={[
                          // Same substring at the start will only be typed out once, initially
                          convo.msg
                        ]}
                        wrapper="span"
                        speed={75}
                      /> : convo.msg}
                      </p>
                  </div>
                ))
                }
              </MDBCardBody>
            {/* </MDBScrollbar> */}
            <MDBCardFooter className="text-muted flex justify-content-start align-items-center p-3">
              <input
                type="text"
                className="form-control form-control-lg w-full h-10"
                id="exampleFormControlInput1"
                value={msg}
                placeholder="Type message"
                onChange={(e)=>setmsg(e.target.value)}
              ></input>
              <button className="ms-3" href="#!" onClick={()=>handleSend()}>
                <MDBIcon fas icon="paper-plane" />
              </button>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}