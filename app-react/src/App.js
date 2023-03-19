import React, {Fragment, useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import UsersList from './components/UsersList';
import Form from './components/Form';

function App() {

  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: ''
  })

  const [users, setUsers] = useState([])

  const [listUpdated, setListUpdated] = useState(false)

  useEffect(() => {
    const getUsers = () => {
      fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then(res => setUsers(res))
    }
    getUsers()
    setListUpdated(false)
  }, [listUpdated])

  return (
    <Fragment>
      <Navbar brand='CRUD Sequelize,React and Node App'/>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{textAlign: 'center'}}>Lista de Usuarios</h2>
            <UsersList user={user} setUser={setUser} users={users} setListUpdated={setListUpdated}/>
          </div>
          <div className="col-5">
            <h2 style={{textAlign: 'center'}}>Información de Usuario</h2>
            <Form user={user} setUser={setUser}/>
          </div>
        </div>
      </div>
    </Fragment>

  );
}

export default App;
