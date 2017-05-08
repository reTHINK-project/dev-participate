import React, {PropTypes} from 'react'
import { Link } from 'react-router'

export const Group = ({id, title, participants, definition}) => {
	return (
            <div className="list-group-item list-group-item-success">
                <div className="row">
                    <div className="col-md-12">
						<h2><Link to={'group/' + id}>{title}</Link></h2>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<p>Filters: {JSON.stringify(definition)} </p>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<p>{participants.length} participants</p>
					</div>
				</div>
			</div>
	)
}

export const GroupInvitation = ({challenge, onAccept, onReject}) => {
	return (
            <div className="list-group-item list-group-item-warning">
				<div className="row">
					<div className="col-xs-12">
						<h2>{challenge.title}</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<p>GROUP INVITATION</p>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<button className="btn btn-default" onClick={()=>onAccept(challenge)}>ACCEPT</button>&nbsp;
						<button className="btn btn-default" onClick={()=>onReject(challenge)}>REJECT</button>
					</div>
				</div>
			</div>
	)
}

export const Chat = ({id, title}) => {
	return (
            <div className="list-group-item list-group-item-danger">
                <div className="row">
                    <div className="col-md-12">
						<h2><Link to={'chat/' + id}>{title}</Link></h2>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<p>CHAT</p>
					</div>
				</div>
			</div>
	)
}

export const Message = ({id, message}) => {
	return (
            <div className="list-group-item list-group-item-info">
				<div className="row">
					<div className="col-xs-12">
						<h2>Message</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<p>{message}</p>
					</div>
				</div>
			</div>
	)
}

export const Survey = ({id})=>{
	return (
            <div className="list-group-item list-group-item-default">
				<div className="row">
					<div className="col-xs-12">
						<h2>Survey</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<p><Link to={"/survey/"+id}>See results</Link></p>
					</div>
				</div>
			</div>
	)
}

export const SurveyRequest = ({id})=>{
	return (
            <div className="list-group-item active">
				<div className="row">
					<div className="col-xs-12">
						<h2>New Survey</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<p><Link to={"/survey_request/"+id}>Participate!</Link></p>
					</div>
				</div>
			</div>
	)
}

const VideoCall = ()=>{}
const VoiceCall = ()=>{}
