import React from 'react'
import { PageHeader, Panel } from 'react-bootstrap'

export default React.createClass({
  displayName: 'HomePage',

  render() {
    return (
      <div className="HomePage">
        <div className="HomePage__Header">
          <div className="HomePage__Header_well">
            <h1>TeamStorm</h1>
            <h3 className="HomePage__Header_subtitle"> Brainstorming software for small teams!</h3>
          </div>
        </div>
        <div className="HomePage__contents container">
          <div className="row HomePage__mission_block">
            <div className="col-lg-12">
              <p>
                TeamStorm is all about fast, reliable communication to help teams
                bring their best ideas forward in a safe environment.
              </p>
              <p>
                Messages posted to brainstorming activites are presented anonymously
                and in real-time.
              </p>
            </div>
          </div>
          <hr />
          <div className="row HomePage__text_block">
            <div className="col-lg-4">
              <Panel header="Real-Time" bsStyle="success">
                All Messages are automatically synchronized to your teammates
                in Real-Time.
              </Panel>
            </div>
            <div className="col-lg-4">
              <Panel header="Flexible" bsStyle="success">
                Messages can be organized in pre-defined formats and
                categories or using a custom builder.
              </Panel>
            </div>
            <div className="col-lg-4">
              <Panel header="Anonymous" bsStyle="success">
                Messages are shown only to your teammates and without displaying
                your username.
              </Panel>
            </div>
          </div>
          <hr />
          <div className="row HomePage__text_block">
            <div className="col-lg-8 col-lg-offset-4">
              <h2>How to</h2>
              <p>Get started with these simple steps:</p>
              <ol>
                <li>Login with your preferred service</li>
                <li>Create a <em>Team</em></li>
                <li>Create an <em>Activity</em> for that team</li>
                <li>Post <em>Messages</em> to that activity</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="HomePage__Footer">
          <div className="container">
            <div className="pull-right">
              Copywright &copy; 2015 Tommy Groshong
            </div>
          </div>
        </div>
      </div>
    )
  }
})

