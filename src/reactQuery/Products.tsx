// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
// import { Link } from 'react-router-dom';

// const fetchProducts = async () => {
//   const response = await fetch('https://dummyjson.com/products');
//   const data = await response.json();
//   return data.products;
// };

// const Products = () => {
//   const { 
//     isLoading,
//     error,
//     data: products,
//   } = useQuery({
//     queryKey: ['products'],
//     queryFn: fetchProducts,
//    // staleTime: 10000, // Set the stale time to 10,000 milliseconds (10 seconds)
//   });


//     //   const [products, setProducts] = useState<Product[]>([]);
//     //   const [isLoading, setIsLoding] = useState(false);
//     //   const [error, setError]= useState(null);

//     //   useEffect(() => {
//     //       const fetchProducts = async () => {
//     //         try{
//     //             setIsLoding(true)
//     //             const response = await fetch('https://dummyjson.com/products');
//     //             const data = await response.json();
//     //             console.log(data.products); 
//     //             setProducts(data.products);
//     //             setIsLoding(false)
//     //         }catch (err: any) {
//     //             setError(err.message);
//     //             setIsLoding(false);
//     //           }
//     //   };
//     //     fetchProducts();
//     //   }, []);


//   if (isLoading) {
//     return <h2>Loading...</h2>;
//   }

//   if (error) {
//     return <h3>Error: {error.message}</h3>;
//   }

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
//           {products.map((product: { id: Key | null | undefined; thumbnail: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; category: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
//             <div key={product.id} className="group relative p-4 bg-white border rounded-md shadow-md transition duration-300 transform hover:scale-105">
//               <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                 <img
//                   src={product.thumbnail}

//                   className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-md"
//                 />
//               </div>
//               <div className="mt-2 flex justify-between">
//                 <div>
//                   <h3 className="text-sm text-gray-700">
//                     <Link to={`/products/${product.id}`} className="hover:underline">
//                       {product.title}
//                     </Link>
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">{product.category}</p>
//                 </div>
//                 <p className="text-sm font-medium text-gray-900">${product.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;


import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';

type Category = string;

type Product = {
    id: number;
    thumbnail: string;
    title: string;
    category: Category;
    price: number;
   
};

function Products() {


 
        const [searchParams, setSearchParams] = useSearchParams({ skip: '0', limit: '4' });
      
        const skip: number = parseInt(searchParams.get('skip') || '0', 10);
        const limit: number = parseInt(searchParams.get('limit') || '4', 10);
        const q = searchParams.get('q') || '';
        const category = searchParams.get('category') || '';

//    const[limit] = useState(4);
//    const[skip , setSkip] = useState(0);

    const { data: categories } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            return await fetch('https://dummyjson.com/products/categories').then((res) =>
                res.json()
            );
        },
    });

    const { data: products } = useQuery<Product[]>({
        queryKey: ['products',limit, skip, q , category],
        
        queryFn: async () => {

         let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`

         if(category){
            url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
         }



            const data = await fetch(url).then((res) => res.json());
            return data.products;
        },
        placeholderData:keepPreviousData,
        staleTime:10000,
    });

     //logic
    //Next
    // skip = 4, moveCount = -4
    // 4 + 4 = 8

    // prev 
    // skip = 0, moveCount =-4
    // 0 + 4 = -4

    const handleMove = (movecount: number) => {
        const updateSkip = (movecount: number) => {
          setSearchParams((prev) => {
            prev.set('skip', Math.max(skip + movecount, 0).toString());
            return prev;
          });
        };
    
        updateSkip(movecount);
      };
    //  setSkip((prevSkip)=>{
    //       return Math.max(prevSkip + movecount, 0);
    //  })
   



    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">My store</h2>
                    </div>
                    <div>
                        <div className="relative mt-2 rounded-md flex items-center gap-8 mb-4">
                            <input
                                onChange={debounce((e) => {
                                    setSearchParams((prev)=>{
                                        prev.set('q',e.target.value);
                                        prev.set('skip','0');
                                        prev.delete('category');
                                        return prev;
                                    })
                                 },1000)}
                                type="text"
                                name="price"
                                id="price"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="IPhone"
                            />
                            <select className="border p-2" onChange={(e) => {
                                setSearchParams((prev)=>{   
                                    prev.set('skip','0');
                                    prev.delete('q');
                                    prev.set('category',e.target.value)
                                    
                                    return prev
                                })
                             }}>
                                <option>Select category</option>
                                {categories?.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products?.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href="">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 mt-12">
                        <button
                            className="bg-purple-500 px-4 py-1 text-white rounded"
                            onClick={() => {handleMove(-limit)}}
                        >
                            Prev
                        </button>
                        <button
                            className="bg-purple-500 px-4 py-1 text-white rounded"
                            onClick={() => {handleMove(limit)}}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
