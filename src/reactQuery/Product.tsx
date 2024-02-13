import { useQuery } from '@tanstack/react-query';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { useParams } from 'react-router-dom';



  

const Product = () => {

    const params = useParams();
    console.log(params);
    

    const fetchProducts = async () => {
        const response = await fetch(`https://dummyjson.com/products/${params.productId}`);
        const data = await response.json();
        return data;
      };

    const { 
        isLoading,
        error,
        data: product,
      } = useQuery({
        queryKey: ['product',params.productId],
        queryFn: fetchProducts,
       // staleTime: 10000, // Set the stale time to 10,000 milliseconds (10 seconds)
      });

      if (isLoading) {
        return <h2>Loading...</h2>;
      }
    
      if (error) {
        return <h3>Error: {error.message}</h3>;
      }
    

  return (
    <div>
      <h1>Product:{product.title}</h1>
    </div>
  )
}

export default Product
function fetchProducts(context: { queryKey: string[]; signal: AbortSignal; meta: Record<string, unknown> | undefined; }): unknown {
    throw new Error('Function not implemented.');
}

