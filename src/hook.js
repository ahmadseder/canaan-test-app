// import React, { useState, useEffect } from 'react';

// const useSubscribe = (app) => {
//     useState(); 
//   return (query, defaultValue) => {
//     const [data, setData] = useState({
//       data: defaultValue,
//       previous: null,
//     });

//     useEffect(() => {
//       app.subscribe(query, (current , previous ) => {
//         setData({ data: current, previous });
//       });

//       // return () => {
//       //   subscription.unsubscribe();
//       // };
//     }, [query]);

//     return data;
//   };
// };


// export default useSubscribe;
