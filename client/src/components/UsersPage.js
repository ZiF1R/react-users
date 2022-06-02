import { useState, useEffect } from 'react';
import usersService from '../services/users';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonGroup, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

function UsersPage(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  let [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    usersService
      .getAllUsers()
      .then(data => {
        setUsers(data.users);
      });
  }, []);

  if (!props.currentUser)
    return (
      <Alert severity="warning">You have no premissions to visit this page, try to authorize!</Alert>
    )

  if (props.currentUser.status !== null)
    return (
      <Alert severity="error">The account was blocked! You have no premissions to visit this page!</Alert>
    )

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'mail', headerName: 'Mail', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'createddate', headerName: 'Created', width: 250 },
    { field: 'lastvisit', headerName: 'Last visit', width: 250 },
  ];
  
  function handleSelection(selectedIndexes, details) {
    const selected = [];
    selectedIndexes.forEach(index => selected.push(
      users.find(user => user.id === index)
    ));
    setSelectedUsers(selected);
  }

  function handleDelete() {
    if (selectedUsers.length === users.length) {
      usersService.removeAllUsers();
      setUsers([]);
      props.setCurrentUser(null);
      navigate("/");
    } else {
      let isCurrentUserRemoved = false;

      selectedUsers.forEach(user => {
        usersService.removeUser(user);

        if (props.currentUser.id === user.id) {
          isCurrentUserRemoved = true;
        }
      });

      if (isCurrentUserRemoved) {
        props.setCurrentUser(null);
        navigate("/");
      }

      usersService
        .getAllUsers()
        .then(data => {
          setUsers(data.users);
        });
    }
  }

  function handleBlock() {
    if (selectedUsers.length === users.length) {
      usersService.blockAllUsers();
      props.setCurrentUser(null);
      navigate("/");
    } else {
      let isCurrentUserBlocked = false;

      selectedUsers.forEach(user => {
        usersService.blockUser(user);

        if (props.currentUser.id === user.id) {
          isCurrentUserBlocked = true;
        }
      });

      if (isCurrentUserBlocked) {
        props.setCurrentUser(null);
        navigate("/");
      }
    }

    usersService
      .getAllUsers()
      .then(data => {
        setUsers(data.users);
      });
  }

  function handleUnblock() {
    selectedUsers.forEach(user => {
      usersService.unblockUser(user);
    });

    usersService
      .getAllUsers()
      .then(data => {
        setUsers(data.users);
      });
  }

  return (
    <>
      <ButtonGroup style={{ marginBottom: 15 }} disableElevation variant="contained">
        <Button onClick={handleBlock}>Block</Button>
        <Button onClick={handleUnblock}>Unblock</Button>
        <Button onClick={handleDelete} variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </ButtonGroup>

      <div style={{ height: 500, maxWidth: 1030, margin: "0 auto" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={handleSelection}
        />
      </div>
    </>
  );
}

export default UsersPage;