
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// interface Post {
//   id: number;
//   title: string;
// }

// const Optimistic: React.FC = () => {
//   const queryClient = useQueryClient();

//   const { data: posts } = useQuery<Post[]>({
//     queryKey: ['posts'],
//     queryFn: async () => {
//       const response = await fetch('http://localhost:3000/posts?_sort=id&_order=desc').then(
//         (data) => data.json()
//       );
//       return response;
//     },
//   });

//   const { mutate, isError } = useMutation<any, unknown, Post>({
//     mutationFn: (newProduct) =>
//       fetch('http://localhost:3000/posts', {
//         method: 'POST',
//         body: JSON.stringify(newProduct),
//         headers: {
//           'content-type': 'Application/json',
//         },
//       }),
//     onSuccess: async () => {
//          await queryClient.invalidateQueries({ queryKey: ['posts'] });
//     },
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const post: Post = {
//       id: Date.now(),
//       title: formData.get('title') as string,
//     };
//     mutate(post);
//   };

//   return (
//     <>
//       <div className="p-4 flex gap-12">
//         <div className="flex-1">
//           <form className="flex flex-col" onSubmit={handleSubmit}>
//             <input
//               className="border mb-4 p-2"
//               type="text"
//               placeholder="Title"
//               name="title"
//             />
//             <button className="border mb-4 p-2 bg-purple-500 text-white" type="submit">
//               Submit
//             </button>
//           </form>
//         </div>
//         <div className="flex-1">
//           <h2 className="text-lg font-bold mb-4">Posts:</h2>
//           <ul>
//             {isError && <p className="text-red-500">Something went wrong</p>}

//             {posts?.map((post) => (
//               <li className="border p-2 mb-4" key={post.id}>
//                 {post.title}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Optimistic;



// import React, { useEffect } from 'react';
// import '../styles/cards.css';

// const Cards = ({ item, handleClick }) => {
//   const { title, author, price, img } = item;

//   useEffect(() => {
//     // Initialize the cart from local storage on component mount
//     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     // TODO: You might want to use this cart data for something (e.g., highlight products that are already in the cart)
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   const handleAddToCart = () => {
//     handleClick(item);

//     // Update local storage with the new cart data
//     const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
//     const updatedCart = [...existingCart, item];
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   return (
//     <div className='cards'>
//       <div className='image_box'>
//         <img src={img} alt='image' />
//       </div>
//       <div className='details'>
//         <p>{title}</p>
//         <p>{author}</p>
//         <p>price -{price}rs</p>
//         <br />
//         <button onClick={handleAddToCart}>Add to cart</button>
//       </div>
//     </div>
//   );
// };

// export default Cards;


// const handleStoredData = () => {
//     // Call the provided handleClick function
//     handleClick(item);
  
//     // Fetch the current cart from localStorage
//     const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  
//     // Check if the item already exists in the cart
//     const isItemInCart = existingCart.find((cartItem) => cartItem.title === item.title);
  
//     if (!isItemInCart) {
//         // If the item is not in the cart, add it
//         const updatedCart = [...existingCart, item];
//         localStorage.setItem('cart', JSON.stringify(updatedCart));
//       } else {
//         // If the item is already in the cart, you may want to handle this case
//         console.log('Item already in the cart');
//       }
//     };
  