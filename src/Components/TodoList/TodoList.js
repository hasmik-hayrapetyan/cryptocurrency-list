import React from 'react';
import '../CryptoList/CryptoListTable/CryptoListTable.css';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
        this.fetchMethode = this.fetchMethode.bind(this);
    }

    componentDidMount() {
        this.fetchMethode();
    }
    fetchMethode() {
        let a = this.state.users.userId ? `?userId=${this.state.users.userId}`: '';

        fetch(`https://jsonplaceholder.typicode.com/posts${a}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    users: json,
                })
            })
    }

    render() {
        let {users} = this.state;
        let {history} = this.props;
        return (
            <div className="Table-container">
                <table className="Table">
                    <thead className="Table-head">
                        <tr>
                            <th onClick={()=> history.push(`/posts`)}>All Users</th>
                        </tr>
                    </thead>
                    <tbody className="Table-body">
                        {
                            users.map((items)=> (
                                <tr key={items.id} onClick={()=> history.push(`/posts?userId=${items.userId}`)}>
                                    <td>{items.id}</td>
                                    <td>{items.body}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        )
    }
}
