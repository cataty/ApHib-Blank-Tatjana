import fs from 'fs/promises';
import crypto from 'crypto'
const path = './users.json';

class UsersManager{
    users = [];

    constructor(users = []){
        this.users = users;
    }

    randomID(){
        return crypto.randomUUID();
    }

    async setUser(user){
        try {
            await this.getUsers();
            user.id = this.randomID();
            this.users.push(user);
            const data = JSON.stringify(this.users, null, 2);
            
            await fs.writeFile(path, data);
            return user.id
        } catch (error) {
            console.log({error})
            console.error('No pudimos guardar el Usuario');
        }
    }  
    

    async getUsers(){
        try {
            const data = await fs.readFile(path, 'utf-8');
            this.users = JSON.parse(data);
            return this.users;
        } catch (error) {
            console.error('No pudimos leer los usuarios')
        }
    }

    async getUserbyId(id){
        await this.getUsers();
        const user = this.users.find(user => user.id == id);
        return user ? user : undefined;
    }

    async deleteUserById(id) {
        await this.getUsers();
        const index = this.users.findIndex(user => user.id == id);
        if(index != -1){
            this.users.splice(index, 1);
            const data = JSON.stringify(this.users, null, 2);
            await fs.writeFile(path, data);
            return true
        } else {
            return false;
        }
    }

    async updateUserById(id, user){  //no anda
        await this.getUsers();
        const index = this.users.findIndex(user => user.id == id);
        if (index != -1){
            this.users[index].name = user.name ? user.name : this.users[index].name;
            this.users[index].email = user.email ? user.email : this.users[index].email;
            const data = JSON.stringify(this.users, null, 2);

            await fs.writeFile(path, data);
            return true
        } else {
            return false;
        }
    }
    
}

export default UsersManager;