// import { useQuery } from '@tanstack/react-query';

// const useBalance = () => {
//   return useQuery(
//     ['userBalance'],
//     async () => {
//       const accessToken = localStorage.getItem('accessToken');

//       const response = await fetch('http://77.37.65.40:3000/api/v1/promotion/balance', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Ошибка при получении баланса');
//       }

//       return response.json(); 
//     }
//   );
// };
// export default useBalance