

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
      <ProductsIndex products={products}/>
    </div>
  );
}
