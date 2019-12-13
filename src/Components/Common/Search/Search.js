import React from 'react';
import './Search.css';
import {Root_API} from "../../Config/Root_API";
import {handleResponse} from "../Helpers";
import Loading from '../Loading';
import {withRouter} from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleChange(e) {
        let searchQuery = e.target.value;

        this.setState({searchQuery});

        if (!searchQuery){ return null; }

        this.setState({loading: true});

        fetch(`${Root_API}/autocomplete?searchQuery=${searchQuery}`)
            .then(handleResponse)
            .then(result => {
                this.setState({
                    loading:false,
                    searchResults: result
                })
            })
    }

    handleRedirect(currencyId){

        this.setState({
            searchResults: [],
            searchQuery: ""
        });
        this.props.history.push(`/currency/${currencyId}`);
    }

    renderSearchResult() {
        const {searchResults, searchQuery, loading} = this.state;

        if (!searchQuery){ return '' }

        if (searchResults.length){
            return (
                <div className="Search-result-container">
                    {
                        searchResults.map(result=>  (
                                <div key={result.id} className="Search-result" onClick={()=> this.handleRedirect(result.id)}>
                                    {result.name} ({result.symbol})
                                </div>
                        ))
                    }
                </div>
            )
        }

        if (!loading){
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No result found.
                    </div>
                </div>
            )
        }

    }


    render(){
        const {loading, searchQuery} = this.state;

        return (
            <div className="Search">
                <span className="Search-icon" />
                <input type="text"
                       className="Search-input"
                       placeholder="Currency name"
                       onChange={this.handleChange}
                       value={searchQuery} />

                {loading &&
                    <div className="Search-loading">
                        <Loading width='12px' height='12px' />
                    </div>
                }

                {this.renderSearchResult()}
            </div>
        )
    }
}

export default withRouter(Search);