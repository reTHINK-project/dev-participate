import React from 'react'
import { Link } from 'react-router'

const NewChatButton = ({onClick}) => {
    return (
        <Link to="new_group" >
            <span className="fab fa-stack fa-2x">
                <i className="fa glyphicon glyphicon-plus-sign fab-backdrop"></i>
            </span>
        </Link>
    )
}

export default NewChatButton
