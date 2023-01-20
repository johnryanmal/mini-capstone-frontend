import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import { Login } from './Login'
import { Signup } from './Signup'
import { Logout } from './Logout'

function ProductsForm() {
  return (
    <div>
      <p>Products Form</p>
    </div>
  )
}

function ProductsNew() {
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
      <h1>Products New</h1>
      <ProductsForm/>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  )
}

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

function SearchBar(props) {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    let data = event.target.value
    setValue(data)
    props.onChange(data)
  }

  return <input type="text" value={value} onChange={handleChange} />
}

function ProductsIndex() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')

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
      <SearchBar onChange={setQuery}/>
      {products.filter((product) => {
        if (query === '') {
          return true
        } else {
          return product.name.toLowerCase().includes(query.toLowerCase())
        }
      }).map((product => (
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

function Header() {
  const hasjwt = (localStorage.getItem("jwt") !== null) ? true : false
  const [user, setUser] = useState({})

  const getUser = () => {
    if (hasjwt) {
      axios.get(`http://localhost:3000/users/current`)
      .then((res) => {
        const data = res.data
        console.log('user', data)
        setUser(data)
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }

  useEffect(getUser, [])

  return (
    <div>
      <h1>Header</h1>
      {hasjwt && (
        <React.Fragment>
          <p>Logged in as {user.name}</p>
          <Logout/>
        </React.Fragment>
      ) || (
        <React.Fragment>
          <Link to='/login'><button>Login</button></Link>
          <Link to='/signup'><button>Signup</button></Link>
        </React.Fragment>
      )}
      <hr/>
      <Link to='/'><button>Home</button></Link>
      <Link to='/new'><button>Create Product</button></Link>
    </div>
  )
}


export default function Content() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<ProductsIndex/>}></Route>
        <Route path='/show/:id' element={<ProductsShow/>}></Route>
        <Route path='/new' element={<ProductsNew/>}></Route>
      </Routes>
    </div>
  );
}
