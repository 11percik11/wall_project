// import { useGetUserByIdQuery } from "../api/userApi";

// export const TestComponent = () => {
//   const { data, error, isLoading } = useGetUserByIdQuery(1);

//   console.log('Data:', data);
//   console.log('Error:', error);
//   console.log('Loading:', isLoading);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {'status' in error ? error.status : ''}</div>;

// //   return (
// //     <div>
// //       <h1>User Data</h1>
// //       <pre>{JSON.stringify(data, null, 2)}</pre>
// //     </div>
// //   );
// };