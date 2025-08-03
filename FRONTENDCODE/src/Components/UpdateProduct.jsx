// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";


// const UpdateProduct = () => {

//     const[name, setName] = useState('');
//     const[price, setPrice] = useState('');
//     const[category, setCategory] = useState('');
//     const[company, setCompany] = useState('');

//     const params = useParams();
//     const navigate = useNavigate();

//     useEffect(() =>{
//         getProductDetails();
//     }, [])

//     const getProductDetails = async ()  => {
//         console.log(params);
//         let result = await fetch(`http://localhost:5000/product/${params.id}`);
//         result = await result.json();
//         setName(result.name);
//         setPrice(result.price);
//         setCategory(result.category);
//         setCompany(result.company);
//     }

   
//     const updateProduct =  async () =>{

//       console.log(name,price,category,company);
//       let result = await fetch(`http://localhost:5000/product/${params.id}`,{
//         method: 'PUT',
//         body: JSON.stringify({name, price, category,company}),
//         headers: {
//             'Content-Type': "applicatin/json" 

//         }
//       });
//       result = await result.json();
//       if(result){
//         navigate('/')
//       }
     
       
//     }

//     return(
//         <div className='product'>
//             <h1>Update Product</h1>
//             <input type="text" placeholder="Enter product name" className='inputBox'
//             onChange={(e) => {setName(e.target.value)}} value={name}/>
            
//             <input type="text" placeholder="enter Product price" className='inputBox'
//             onChange={(e) => {setPrice(e.target.value)}} value={price}/>
             


//             <input type="text" placeholder="enter Product category" className='inputBox'
//             onChange={(e)  => {setCategory(e.target.value)}} value={category}/>
            

//             <input type="text" placeholder="enter Product company" className='inputBox'
//             onChange={(e) => {setCompany(e.target.value)}} value={company}/>
             

//             <button onClick={updateProduct} className='appButton'>Update Product</button>
//         </div>
//     )
// }

// export default UpdateProduct;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`);
            result = await result.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }

    const updateProduct = async () => {
        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            if (result) {
                navigate('/')
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter product name" className='inputBox'
                onChange={(e) => { setName(e.target.value) }} value={name} />
            <input type="text" placeholder="enter Product price" className='inputBox'
                onChange={(e) => { setPrice(e.target.value) }} value={price} />
            <input type="text" placeholder="enter Product category" className='inputBox'
                onChange={(e) => { setCategory(e.target.value) }} value={category} />
            <input type="text" placeholder="enter Product company" className='inputBox'
                onChange={(e) => { setCompany(e.target.value) }} value={company} />
            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;
