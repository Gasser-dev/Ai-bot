import { Routes,Route } from "react-router"
import Home from "./Home"
import Login04 from "./login-2"
import { NotFoundPage } from "../ui/404-page-not-found"
import Login05 from "./signup"
function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login04/>}/>
      <Route path="/signup" element={<Login05/>}/>
      <Route path ="*" element={<NotFoundPage/>}/>
      </Routes>
  )
}

export default Pages