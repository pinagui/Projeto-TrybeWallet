import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeState } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>

            {
              expenses.length >= 1
              && expenses.map((data) => (
                <tr key={ data.id }>
                  <td>{data.description}</td>
                  <td>{data.tag}</td>
                  <td>{data.method}</td>
                  <td>{Number(data.value).toFixed(2)}</td>
                  <td>{data.exchangeRates[data.currency].name}</td>
                  <td>{Number(data.exchangeRates[data.currency].ask).toFixed(2)}</td>
                  <td>
                    {Number(
                      data.exchangeRates[data.currency].ask * data.value,
                    ).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => dispatch(removeState(data.id)) }
                    >
                      Editar/Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
