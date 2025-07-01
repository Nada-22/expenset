import { TestBed } from '@angular/core/testing';

import { ExpenseService } from './expense.service';
import { ExpenseI } from '@interfaces/expense';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const expense: ExpenseI = {
  category: {
    id: 'string',
    name: 'string',
    createdAt: 'string',
    icon: 'string',
  },
  date: '12/12/2025',
  amount: 1000,
  currencyRate: 24,

  receipt: 'file.png',
  usdAmount: 20,

};
fdescribe('ExpenseService', () => {
  let expenseService: ExpenseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        ExpenseService
      ]
    });

    expenseService = TestBed.inject(ExpenseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('expense service should be created', () => {
    expect(expenseService).toBeTruthy();
  });

  describe('API URL', () => {
    it('should have correct API URL', () => {
      expect(expenseService.API_URL).toEqual('https://6861cc6296f0cc4e34b77cae.mockapi.io/api/v1');
    });

  });

  it('should fetch all expenses', () => {
    const mockResponse: ExpenseI[] = [expense];


    expenseService.getAllExpenses().subscribe(response => {

      expect(response.length).toBeGreaterThan(0);
      expectExpenseType(response[0]);

    });

    const req = httpMock.expectOne(`${expenseService.API_URL}/expenses`);
    expect(req.request.method).toBe('GET');
    expect(req.request.body).toBeNull();
    req.flush(mockResponse);
  });

  it('should create an expense', () => {
    const mockResponse: ExpenseI = expense;

    expenseService.addExpense(expense).subscribe(response => {

      expectExpenseType(response);

    });

    const req = httpMock.expectOne(`${expenseService.API_URL}/expenses`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expense);
    req.flush(mockResponse);
  });
});

function expectExpenseType(actual: ExpenseI) {
  expect(actual).toEqual(jasmine.objectContaining({

    category: {
      id: jasmine.any(String),
      name: jasmine.any(String),
      createdAt: jasmine.any(String),
      icon: jasmine.any(String),
    },
    date: jasmine.any(String),
    amount: jasmine.any(Number),
    currencyRate: jasmine.any(Number),

    receipt: jasmine.any(String),
    usdAmount: jasmine.any(Number),
  }));
}

