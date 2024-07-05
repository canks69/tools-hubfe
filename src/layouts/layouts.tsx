import {Outlet} from "react-router-dom";
// import {Navbar} from "./navbar/navbar";
import {useEffect, useState} from "react";
import axios from "axios";

export const Layouts = () => {
  const [uuid, setUuid] = useState<string>('')
  const generateUuid = () => {
    axios.get('/api/session/uuid')
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('userId', res.data.uuid)
          setUuid(res.data.uuid)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setUuid(localStorage.getItem('userId') as string)
    } else {
      generateUuid()
    }
  }, [uuid])

  return (
    <>
      {/*<Navbar/>*/}
      <Outlet/>
    </>
  );
}