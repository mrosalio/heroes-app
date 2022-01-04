import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Pruebas en <HeroScreen />', () => {
  test('NO debe mostrar el HeroScreen si no hay un heroe en el url', () => {

  })

})
