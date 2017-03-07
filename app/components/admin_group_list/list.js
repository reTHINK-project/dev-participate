import React from 'react'
import { Link } from 'react-router'
import NewActionButton from './new_action_button'

const GroupList = ({groups}) => {
        return(
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <div className="panel panel-default">
                            <div className="panel-heading"><Link to="admin/admin_group">Group 1</Link></div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="panel panel-default">
                            <div className="panel-heading"><Link to="admin/admin_group">Group 2</Link></div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="panel panel-default">
                            <div className="panel-heading"><Link to="admin/admin_group">Group 3</Link></div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="panel panel-default">
                            <div className="panel-heading"><Link to="admin/admin_group">Group 4</Link></div>
                        </div>
                    </div>
                </div>
                <NewActionButton/>
            </div>
        )
}

export default GroupList
