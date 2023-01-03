/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from '@testing-library/dom';
import NewBillUI from '../views/NewBillUI.js';
import NewBill from '../containers/NewBill.js';
import userEvent from '@testing-library/user-event';
import { localStorageMock } from '../__mocks__/localStorage.js';
import Store from '../__mocks__/store.js';
import router from '../app/Router.js';
import { ROUTES_PATH } from '../constants/routes.js';
import mockStore from '../__mocks__/store.js';

jest.mock('../app/Store', () => mockStore);

describe('Given I am connected as an employee and I am on new bill page', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    localStorage.setItem(
      'user',
      JSON.stringify({
        type: 'Employee',
      })
    );

    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.append(root);

    router();
  });

  beforeEach(() => {
    window.onNavigate(ROUTES_PATH.NewBill);

    global.newBill = new NewBill({
      document,
      onNavigate: () => {},
      localStorage: window.localStorage,
      store: Store,
    });
  });

  afterAll(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  describe('When I submit an empty form', () => {
    test('Then the handleSubmit function is called and nothing should happen', async () => {
      const handleSubmit = jest.fn(global.newBill.handleSubmit);

      const form = screen.getByTestId('form-new-bill');
      form.addEventListener('submit', handleSubmit);

      fireEvent.submit(form, {});
    });
  });

  test('Then the nav email icon should be highlighted', () => {
    const icon = screen.getByTestId('icon-mail');

    expect(icon.classList.contains('active-icon')).toBe(true);
  });

  describe('When a valid file is uploaded', () => {
    test('Then it should be sent to api', async () => {
      const handleChangeFile = jest.fn(global.newBill.handleChangeFile);

      const input = screen.getByTestId('file');
      input.addEventListener('change', handleChangeFile);

      fireEvent.change(input, {
        target: {
          files: [new File(['body'], 'bill.jpeg', { type: 'image/jpeg' })],
        },
      });
    });
  });

  describe('When I submit a form with valid values', () => {
    test('Then the bill should be created', async () => {
      const container = new NewBill({
        document,
        onNavigate: () => {},
        localStorage: window.localStorage,
        store: mockStore,
      });

      const onSuccess = jest.fn();

      container.onNavigate = onSuccess;

      const newBill = {
        id: '123456789',
        vat: '85',
        fileUrl:
          'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        status: 'pending',
        type: 'Hôtel et logement',
        commentary: 'My Hotel',
        name: 'My Name',
        fileName: 'pexels-photo-164595.jpeg',
        date: '2023-01-01',
        amount: 80,
        commentAdmin: 'ys',
        email: 'myhotel@gmail.com',
        pct: 21,
      };

      await container.updateBill(newBill);
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
