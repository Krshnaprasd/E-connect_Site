// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const Demo = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {  
//         axios ("https://dummyjson.com/users")
//             .then(response => response.data)
//             .then(data => {
               
//                 setUsers(data.users);
//                 console.log(data);
                
//             })
//             .catch(err => {
//                 console.error(err); 
//             });
//     }, []);

//     return (
//         <>
//             {users.map((user,index) => (
//                 <p key={user.id}>{index + 1}. {user.firstName} {user.lastName}
//                 </p>
//             ))}
//         </>
//     );
// }

// export default Demo;


