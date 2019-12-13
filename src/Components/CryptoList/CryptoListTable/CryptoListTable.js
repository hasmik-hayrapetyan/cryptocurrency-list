import React from 'react';
import './CryptoListTable.css';
import PropTypes from 'prop-types';
import { renderPercentChange } from '../../Common/Helpers';

const CryptoListTable = (props) => {
        let { currencies,sortByData, history } = props;

        return (
            <div className="Table-container">
            <table className="Table">
                <thead className="Table-head">
                    <tr onClick={sortByData}>
                        <th>Concurrency</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>24H Change</th>
                    </tr>
                </thead>
                <tbody className="Table-body">
                    {
                        currencies.map(({id, rank, name, price, marketCap, percentChange24h}) => (
                            <tr key={id} onClick={() => history.push(`/currency/${id}`)}>
                                <td>
                                    <span className="Table-rank">{rank}</span>
                                    {name}
                                </td>
                                <td>
                                    <span className="Table-dollar">&#36; </span>
                                    {price}
                                </td>
                                <td>
                                    <span className="Table-dollar">&#36; </span>
                                    {marketCap}
                                </td>
                                <td>{renderPercentChange(percentChange24h)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

CryptoListTable.prototype = {
    currencies: PropTypes.arrayOf(PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            rank: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            marketCap: PropTypes.string.isRequired,
            // percentChange24h: PropTypes.string.isRequired
        }
    )).isRequired,
    renderChangePercent: PropTypes.func.isRequired,
    sortByData: PropTypes.func.isRequired
}
export default CryptoListTable;
