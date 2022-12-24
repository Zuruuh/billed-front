/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from '@testing-library/dom';
import NewBillUI from '../views/NewBillUI.js';
import NewBill from '../containers/NewBill.js';
import userEvent from '@testing-library/user-event';
import { localStorageMock } from '../__mocks__/localStorage.js';
import Store from '../__mocks__/store.js';

describe('Given I am connected as an employee and I am on new bill page', () => {
  beforeEach(() => {
    document.body.innerHTML = NewBillUI();
    global.newBill = new NewBill({
      document,
      onNavigate: () => {},
      localStorage: localStorageMock,
      store: Store,
    });
  });

  describe('When I submit an empty form', () => {
    test('Then nothing should happen', async () => {
      const submitButton = document.querySelector('#btn-send-bill');

      await userEvent.click(submitButton);
    });
  });

  test('Then the nav email icon should be highlighted', () => {
    const icon = screen.getByTestId('icon-mail');

    expect(icon.classList.contains('active-icon')).toBe(true);
  });

  describe('When ', () => {
    test('Then ...', () => {
      document.body.innerHTML = NewBillUI();
    });
  });
});
