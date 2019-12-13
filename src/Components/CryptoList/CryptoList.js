import React from 'react';
import {Root_API} from '../Config/Root_API';
import { handleResponse } from '../Common/Helpers';
import Loading from '../Common/Loading';
import './CryptoList.css';
import CryptoListTable from './CryptoListTable';
import CryptoListPagination from './CryptoListPagination';

export default class CryptoList extends React.Component {
    errorMessage;
    constructor(props){
        super(props);

        this.state = {
            currencies: [],
            loading: false,
            error: null,
            page: 1,
            totalPages: 0,
            isToggleOn: true
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
        this.sortByData = this.sortByData.bind(this);
    }

    componentDidMount() {
        this.changeFetchInfo();
    }

    changeFetchInfo(){
        this.setState({loading: true});
        let {page} = this.state;

        fetch(`${Root_API}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then(data => {
                this.setState({
                    currencies: data.currencies,
                    loading: false,
                    totalPages: data.totalPages,
                });
            })
            .catch(error => {
                this.setState({
                    error: error.errorMessage,
                    loading: false
                });
            })
    }

    sortByData(e){
        // toggle status ( start = true )
        let {isToggleOn} = this.state;

        // event target status
        let eventStatus =["Concurrency", "Price", "Market Cap", "24H Change"];

        //Clone currencies array
        let sortable = [...this.state.currencies];

        //New currencies {obj}
        let obj;

        // Concurrency name sort
        if (e.target.innerText === eventStatus[0]) {
             obj = isToggleOn ?
                        sortable.sort(( a, b ) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0 )
                            : sortable.sort(( a, b ) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0 );
        }

        // Concurrency price sort
        if (e.target.innerText === eventStatus[1]
            || e.target.innerText === eventStatus[2]) {
            let resultA,resultB,numA,numB;

            obj = isToggleOn ?
                        sortable.sort(( a, b ) => {
                            numA = e.target.innerText === eventStatus[1] ? a.price : e.target.innerText === eventStatus[2] ? a.marketCap: 0;
                            numB = e.target.innerText === eventStatus[1] ? b.price : e.target.innerText === eventStatus[2] ? b.marketCap: 0;
                            resultA = numA.replace(',', '');
                            resultB = numB.replace(',', '');
                            return parseInt(resultA) - parseInt(resultB)
                        })
                        : sortable.sort(( a, b ) => {
                            numA = e.target.innerText === eventStatus[1] ? a.price : e.target.innerText === eventStatus[2] ? a.marketCap: 0;
                            numB = e.target.innerText === eventStatus[1] ? b.price : e.target.innerText === eventStatus[2] ? b.marketCap: 0;
                            resultA = numA.replace(',', '');
                            resultB = numB.replace(',', '');
                            return parseInt(resultB) - parseInt(resultA)
                        });
        }

        // change state
        this.setState({
            isToggleOn: !this.state.isToggleOn,
            currencies: obj
        });

    }

    handlePaginationClick(dirArrow){
        let dirPage = this.state.page;
        dirPage = (dirArrow === 'next') ? dirPage - 1 : dirPage + 1;
        this.setState({
            page: dirPage
        }, this.changeFetchInfo)
    }


    render() {
        let { currencies, loading, error, page, totalPages} = this.state;

        if (loading) {return <div className="loading-container"><Loading /></div>}

        if (error) {return <div className="error-container">{error}</div>}

        return (
            <div>
                <CryptoListTable
                    currencies={currencies}
                    sortByData={this.sortByData}
                />
                <CryptoListPagination
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        )
    }
}