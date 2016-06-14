import React from 'react'

const Notification = ({ id, data, type, isNew, onRemove }) => {
    return (
            <li className={"list-group-item" + (isNew?" list-group-item-success":"")}>
                <div className="row">
                    <div className="col-xs-2">
                      <img className="thumbnail" src="img/bulb.png"/>
                    </div>
                    <div className="col-xs-8">
                        <div className="row">
                            <div className="col-xs-12">
                               <h3>{type}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-4">
                               <p>Data</p> 
                            </div>
                            <div className="col-xs-8">
                                <p>{JSON.stringify(data)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-2">
                       <button type="button" className="btn btn-default" aria-label="Close" onClick={()=>onRemove(id)}>
                          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                       </button> 
                    </div>
                </div>
            </li>
        )
}

export default Notification
