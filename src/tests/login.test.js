import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';
import Wallet from '../pages/Wallet';

describe('Test Login Page', () => {
  it('Email and Password Input to be in the', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(/email/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('User type wrong email button to be disable', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    userEvent.type(emailInput, 'teste');
    userEvent.type(passwordInput, '1234567');
    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(btn).toBeDisabled();
  });

  it('User type wrong password button to be disable', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123');
    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(btn).toBeDisabled();
  });

  it('User type right email and password button to be enable', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'teste@email.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(btn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });

  it('User email is in the Store after login', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'teste@google.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(btn);

    expect(store.getState().user.email).toBe('teste@google.com');
  });

  it('Tests if you can add an expense', () => {
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();

    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addBtn).toBeInTheDocument();

    userEvent.type(descriptionInput, 'oi');
    userEvent.click(addBtn);
    const descriptionRender = screen.getByText('oi');

    expect(descriptionRender).toBeInTheDocument();
  });
});
