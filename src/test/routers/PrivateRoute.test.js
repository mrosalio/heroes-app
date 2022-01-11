import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRoute';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <span>Saliendo de aqui</span>
}))

describe('Pruebas en <PrivateRoute />', () => {
  Storage.prototype.setItem = jest.fn();

  test('debe mostrar el componente si esta autenticado y guardar en el local storage', () => {
    const contextValue = {
      user: {
        logged: true,
        name: 'Pepe'
      }
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.text().trim()).toBe('Private Component');
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
  })

  test('debe bloquear el componente si no esta autenticado', () => {
    const contextValue = {
      user: {
        logged: false
      }
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.text().trim()).toBe('Saliendo de aqui');
  })
})