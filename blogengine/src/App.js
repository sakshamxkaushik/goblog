

import './App.css';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';


function App() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const apiUrl = "http://localhost:8080";
        const response = await axios.get('apiUrl'); // Make the API request to the correct URL
        if (response.status === 200) {
          setApiData(response?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // The empty dependency array means this effect runs once on component mount

  console.log(apiData);

  return (
    <Container>
      <Row>
        <Col xs="12 py-2">
          <h1 className="text-center">
            Blog Engine with Go Backend and React Frontend
            </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default App;






// function App() {

//   const [user, setUser] = useState({})

//   axios.defaults.withCredentials = true;
//   useEffect(() => {
//     // getting the user information
//     axios.get('http://localhost:8080/api/blog')
//     .then(user => {
//       setUser(user.data)
//     })
//     .catch(err => console.log(err))
//   }, [])

//   return (
//     <userContext.Provider value={user}>
//       <Router>
//         <Navbar/>
        
//         <Routes>
//           <Route path='/' element={<Home/>} />
//           <Route path='/register' element={<Register/>} />
//           <Route path='/login' element={<Login/>} />
//           <Route path='/create' element={<Create/>} />
//           <Route path='/post/:id' element={<Post/>} />
//           <Route path='/editPost/:id' element={<EditPost/>} />
//         </Routes>
//       </Router>
//     </userContext.Provider>
//   );
// }

// export default App;
