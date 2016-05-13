import React from 'react'
import { Link } from 'react-router'
import { setChatName } from '../../actions'
import { connect } from 'react-redux'

const ChatForm = ({chatName, setName}) => {
        return(
                <form>
                    <div className="form-group">
                        <label for="chatName">Name</label>
                        <input type="text" className="form-control" id="chatName" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <Link to='add_participants' className="btn btn-default">Next</Link>
                </form>
        )
}

export default connect((state)=>{
    return {
        chatName: state.chatName
    }
},(dispatch)=>{
    return {
        setName: (name)=>dispatch(setChatName(name))
    }
})(ChatForm)
