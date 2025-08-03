import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./Components/Nav"
import PrivateComponent from "./Components/PrivateComponent"
import Signup from "./Components/Signup";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import ProductList from "./Components/ProductList";
import UpdateProduct from "./Components/UpdateProduct";



function App() {
 

  return (
    <div>
      <BrowserRouter>
      <Nav />
      <Routes>

      <Route element = {<PrivateComponent />}>
      <Route path ='/' element = {<AddProduct />} />
    <Route path ='/add' element = {<ProductList />} />
    <Route path ='/update/:id' element = {<UpdateProduct />} />
    <Route path ='/logout' element = {<h1> Logout Product Component</h1>} />
    <Route path ='/profile' element = {<h1>Profile Component</h1>} />



      </Route>
      <Route path ='/signup' element = {<Signup />} />
      <Route path ='/login' element = {<Login />} />



      </Routes>
      
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App;
