import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

function ProductsIndex() {
  const [products, setProducts] = useState([])

  const getProducts = () => {
    axios.get(`http://localhost:3000/products.json`)
    .then((res) => {
      const data = res.data
      //console.log(data)
      setProducts(data)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  useEffect(getProducts, [])

  return (
    <div>
      <h1>Products Index</h1>
      {products.map((product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <Link to={`/show/${product.id}`}>
            <button>Select</button>
          </Link>
        </div>
      )))}
    </div>
  )
}


export default function Content() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProductsIndex/>}></Route>
      </Routes>
    </div>
  );
}
