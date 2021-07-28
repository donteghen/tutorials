const users = [];

const addUser = ({id, username, room}) => {
    username = username?.trim().toLowerCase();
    room = room.trim()?.toLowerCase(); 

    if(!username || !room){
        return {
            error:'Username and room are required!'
        }
    }

    const existingUser = users.find(user => user.username === username && user.room === room)
    if(existingUser){
        return {
            error: 'Username already exists in this room.'
        }
    }
    const user = {id, username, room}
    users.push(user)
    console.log(users)
    return {user:user}
}


const getUser = ({id}) => {
    return users.find(user => user.id === id)
}

const getUsersInRoom = ({room}) => {
    return users.filter(user => user.room === room)
}

const removeUser = ({id}) => {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

module.exports = {addUser, getUsersInRoom, getUser, removeUser}