import * as React from "react";
//import '../custom.css';


// Header is called by Root and calls Home
export class Chat extends React.Component {
    render() {
        return (

            <div className="container main-section">
                <div className="row">
                    <div className="col-md-3 col-sm-3 col-xs-12 left-sidebar">
                        <div className="icon_chat text-center">
                            hala
                  </div>
                        <div className="left-chat">
                            <ul>
                                <li>
                                    <div className="chat-left-img">
                                        <img src="../images/businessman.png" />
                                    </div>
                                    <div className="chat-left-detail">
                                        <p>Chatter 1</p>
                                        <span>
                                            <i className="fa fa-circle" aria-hidden="true"></i> online</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="chat-left-img">
                                        <img src="../images/index.jpg" />
                                    </div>
                                    <div className="chat-left-detail">
                                        <p>Chatter 2</p>
                                        <span>
                                            <i className="fa fa-circle" aria-hidden="true"></i> online</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="chat-left-img">
                                        <img src="../images/1499345224_female1.png" />
                                    </div>
                                    <div className="chat-left-detail">
                                        <p>Chatter 3</p>
                                        <span>
                                            <i className="fa fa-circle orange" aria-hidden="true"></i> offline</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="chat-left-img">
                                        <img src="../images/man.png" />
                                    </div>
                                    <div className="chat-left-detail">
                                        <p>Chatter 4</p>
                                        <span>
                                            <i className="fa fa-circle" aria-hidden="true"></i> online</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="chat-left-img">
                                        <img src="../images/1499344631_malecostume.png" />
                                    </div>
                                    <div className="chat-left-detail">
                                        <p>Chatter 5</p>
                                        <span>
                                            <i className="fa fa-circle orange" aria-hidden="true"></i> offline</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="chat-left-img">
                                        <img src="../images/1499345471_boy.png" />
                                    </div>
                                    <div className="chat-left-detail">
                                        <p>Chatter 6</p>
                                        <span>
                                            <i className="fa fa-circle" aria-hidden="true"></i> online</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9 col-xs-12 right-sidebar">
                        <div className="row">
                            <div className="col-md-12 right-header">
                                <div className="right-header-img">
                                    <img src="../images/businessman.png" />
                                </div>
                                <div className="right-header-detail">
                                    <p>You</p>
                                    <span>Logged </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 right-header-contentChat">
                                <ul>
                                    <li>
                                        <div className="rightside-left-chat">
                                            <span>
                                                <i className="fa fa-circle" aria-hidden="true"></i> You
                                            <small>10:00 AM,Today</small>
                                            </span>
                                            <br />
                                            <br />
                                            <p>Lorem ipsum dolor sit ameeserunt mollit anim id est laborum. Lorem ipsum dolor sit ameeserunt mollit anim mollit
                                            anim laborum. Lorem ipsum dolor sit ameeserunt mollit anim id est laborum.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="rightside-right-chat">
                                            <span>
                                                <small>10:00 AM,Today</small> Chatter 2
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            </span>
                                            <br />
                                            <br />
                                            <p>Lorem ipsum dolor sit ameeserunt mollit anim id est laborum. Lorem ipsum dolor sit ameeserunt mollit anim id est
                                              laborum.
                                        </p>

                                        </div>
                                    </li>
                                    <li>
                                        <div className="rightside-left-chat">
                                            <span>
                                                <i className="fa fa-circle" aria-hidden="true"></i> You
                                            <small>10:00 AM,Today</small>
                                            </span>
                                            <br />
                                            <br />
                                            <p>Lorem ipsum dolor sit ameeserunt mollit anim id est laborum. Lorem ipsum dolor sit ameeserunt mollit anim mollit
                                            anim laborum. Lorem ipsum dolor sit ameeserunt mollit anim id est laborum.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="rightside-right-chat">
                                            <span>
                                                <small>10:00 AM,Today</small> Chatter 3
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            </span>
                                            <br />
                                            <br />
                                            <p>Lorem ipsum dolor sit ameeserunt mollit anim id est laborum. Lorem ipsum dolor sit ameeserunt mollit anim id est
                                              laborum.
                                        </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="rightside-left-chat">
                                            <span>
                                                <i className="fa fa-circle" aria-hidden="true"></i> You
                                            <small>10:00 AM,Today</small>
                                            </span>
                                            <br />
                                            <br />
                                            <p>Lorem ipsum dolor sit ameeserunt mollit anim id est laborum. Lorem ipsum dolor sit ameeserunt mollit anim mollit
                                            anim laborum. Lorem ipsum dolor sit ameeserunt mollit anim id est laborum.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="rightside-right-chat">
                                            <span>
                                                <small>10:00 AM,Today</small> Chatter 2
                                            <i className="fa fa-circle" aria-hidden="true"></i>
                                            </span>
                                            <br />
                                            <br />
                                            <p>Lorem ipsum dolor sit ameeserunt mollit anim id est laborum. Lorem ipsum dolor sit ameeserunt mollit anim id est
                                              laborum.
                                        </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="rightside-left-chat">
                                            <span>
                                                <i className="fa fa-circle" aria-hidden="true"></i> You
                                            <small>10:00 AM,Today</small>
                                            </span>
                                            <br />
                                            <br />
                                            <p>Lorem ipsum dolor sit ameeserunt mollit anim id est laborum. Lorem ipsum dolor sit ameeserunt mollit anim mollit
                                            anim laborum. Lorem ipsum dolor sit ameeserunt mollit anim id est laborum.</p>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 right-chat-textbox">
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            //  <p classNameName="App-intro">
            //   To get started, edit <code>src/App.tsx</code> and save to reload.
            //   Response from Server{this.state.response}
            // </p> 

        );
    }
}