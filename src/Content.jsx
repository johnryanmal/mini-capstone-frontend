import { Routes, Route } from 'react-router-dom'

function ProductsIndex(props) {
  return (
    <div>
      {props.products?.map(((product, index) => (
        <div key={index}>
          <p>{product}</p>
        </div>
      )))}
    </div>
  )
}


export default function Content() {
  const products = [1,2,3]

  return (
    <div>
      <Routes>
        <Route path='/' element={<ProductsIndex products={products}/>}></Route>
      </Routes>
    </div>
  );
}
