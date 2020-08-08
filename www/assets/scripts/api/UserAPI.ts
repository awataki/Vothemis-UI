import axios from 'axios'
import User from '~/assets/scripts/model/User'

export default class UserAPI {
   _token:String
   async getBy (userId: number): Promise<User> {
     const res = await axios.get('/api/v1/user/' + userId.toString(), { headers: { Authorization: 'bearer ' + this._token } })
     return this.parseUser(res.data)
   }

   async create (user: User) :Promise<User> {
     const res = await axios.post('/api/v1/user/create', user, { headers: { 'Content-Type': 'application/json', Authorization: 'bearer ' + this._token } })
     return this.parseUser(res.data)
   }

   async update (user:User) :Promise<User> {
     const res = await axios.put('/api/v1/user/' + user.id.toString, { headers: { 'Content-Type': 'application/json', Authorization: 'bearer ' + this._token } })
     return this.parseUser(res.data)
   }

   private parseUser (json:any):User {
     return new User(
       +json.id,
       json.name,
       json.bio
     )
   }

   constructor (token:String) {
     this._token = token
   }
}