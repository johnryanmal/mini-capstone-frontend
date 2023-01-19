import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'

function ProductsShow() {
  const params = useParams()
  const [product, setProduct] = useState({})

  const getProduct = () => {
    axios.get(`http://localhost:3000/products/${params.id}.json`)
    .then((res) => {
      const data = res.data
      //console.log('show', data)
      setProduct(data)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  useEffect(getProduct, [])

  return (
    <div>
      <h1>Product Show</h1>
      <div>
        {product && Object.entries(product).map(([key, value]) => (
          <p key={key}>{key}: {value?.toString()}</p>
        ))}
      </div>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  )
}

function ProductsIndex() {
  const [products, setProducts] = useState([])

  const getProducts = () => {
    axios.get(`http://localhost:3000/products.json`)
    .then((res) => {
      const data = res.data
      //console.log('index', data)
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
        <Route path='/show/:id' element={<ProductsShow/>}></Route>
      </Routes>
    </div>
  );
}
