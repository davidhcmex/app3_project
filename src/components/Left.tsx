import * as React from 'react';
import { connect } from "react-redux"

interface PropsInterface {
 
    users: Array<{ _id: string, username: string, selected: boolean }>

}

export class Left extends React.Component<PropsInterface,{}> {

    handleChat = (e: React.FormEvent<HTMLButtonElement>) => {

        console.log(e.currentTarget.id)

    }

    render() {
        return (
            <div>
                {/* 1/1 REDUX REDUX REDUX REDUX REDUX */}
                {/* {(this.state.allUsers).map((d, idx) => { */}
                {(this.props.users).map((d, idx) => {
                    if (d.selected) {
                        let li_value = "Contact: ".concat(d.username)
                        return (<button onClick={this.handleChat} className="btn btn-info" key={idx} id={d._id}>{li_value}</button>)
                    }
                    else
                        return
                })}

            </div >
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.allUsersInState,
    };
};

export default connect<PropsInterface, {}, {}>(mapStateToProps,{})(Left)

