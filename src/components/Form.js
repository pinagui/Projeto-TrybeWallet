import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiExpenses } from '../redux/actions';

class Form extends Component {
  state = {
    info: {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
  };

  componentDidMount() {
    this.setState({
      total: 0,
    });
  }

  handleChange = ({ target }) => {
    const { info } = this.state;
    const { name, value } = target;
    this.setState({
      info: { ...info, [name]: value },
    });
  };

  handleClick = () => {
    this.setState((prev) => ({
      info: {
        value: '',
        description: '',
        id: prev.info.id + 1,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    }));
  };

  render() {
    const { info, total } = this.state;
    const { info: { value, description, currency, method, tag } } = this.state;
    const { currencies, dispatch } = this.props;
    return (
      <div>
        <header>
          <p>
            { total }
          </p>
        </header>
        <form>
          <input
            type="text"
            name="value"
            value={ value }
            data-testid="value-input"
            placeholder="Value"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            placeholder="Description"
            onChange={ this.handleChange }
          />
          <label htmlFor="Select">
            Currencies
            <select
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              { currencies.map((currencie) => (
                <option key={ currencie }>{currencie}</option>
              )) }
            </select>
          </label>
          <label htmlFor="Select">
            Pay method
            <select
              name="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="Select">
            Tag
            <select
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          onClick={ () => {
            dispatch(fetchApiExpenses(info));
            this.handleClick();
          } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Form);
