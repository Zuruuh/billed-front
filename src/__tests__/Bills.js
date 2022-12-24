/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from '@testing-library/dom';
import BillsUI from '../views/BillsUI.js';
import { bills } from '../fixtures/bills.js';
import { ROUTES_PATH } from '../constants/routes.js';
import { localStorageMock } from '../__mocks__/localStorage.js';

import router from '../app/Router.js';
import userEvent from '@testing-library/user-event';
import Bills from '../containers/Bills';
import Store from '../__mocks__/store';

describe('Given I am connected as an employee', () => {
  describe('When I am on Bills Page', () => {
    test('Then bill icon in vertical layout should be highlighted', async () => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          type: 'Employee',
        })
      );
      const root = document.createElement('div');
      root.setAttribute('id', 'root');
      document.body.append(root);
      router();
      window.onNavigate(ROUTES_PATH.Bills);
      await waitFor(() => screen.getByTestId('icon-window'));
      const windowIcon = screen.getByTestId('icon-window');
      expect(windowIcon.classList.contains('active-icon')).toBe(true);
    });
    test('Then bills should be ordered from earliest to latest', () => {
      document.body.innerHTML = BillsUI({ data: bills });
      const dates = screen
        .getAllByText(
          /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i
        )
        .map((a) => a.innerHTML);
      const antiChrono = (a, b) => (a < b ? 1 : -1);
      const datesSorted = [...dates].sort(antiChrono);
      expect(dates).toEqual(datesSorted);
    });
  });
  test('When I click on show bill button', async () => {
    document.body.innerHTML = BillsUI({
      data: await Store.bills().list(),
    });

    const billsContainer = new Bills({
      document,
      onNavigate: () => {},
      store: Store,
      localStorageMock,
    });

    const eye = document.querySelector('.eye');
    eye.onclick = () => billsContainer.handleClickIconEye(eye);

    const modal = document.querySelector('#modaleFile');
    expect(modal).not.toBeNull();
    expect(modal.classList.contains('show')).toBe(false);

    await userEvent.click(eye);

    expect(modal.classList.contains('show')).toBe(true);
  });
});

test('Bills.getBills', async () => {
  const billsContainer = new Bills({
    document,
    onNavigate: () => {},
    store: Store,
    localStorageMock,
  });

  const bills = await billsContainer.getBills();

  expect(Array.isArray(bills)).toBe(true);
  expect(bills.length).toBeGreaterThan(0);
});
