import { render, screen } from '@testing-library/react'
import { Signup } from './signup'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'resources/theme'
import { disableFormButton } from 'services/utils'

describe('First user interaction', () => {
  function renderSignupScreen () {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </ThemeProvider>,
    )

    return {
      headingEl: screen.getByRole('heading', { name: 'Sign up' }),
      buttonEl: screen.getByRole('button', { name: 'Sign up' }),
      linkEl: screen.getByRole('link', { name: 'Sign in' }),
    }
  }

  describe('When the page loads,', () => {
    it('the form legend is shown', () => {
      const { headingEl } = renderSignupScreen()

      expect(headingEl).toBeInTheDocument()
    })

    it('the sign up button is shown', () => {
      const { buttonEl } = renderSignupScreen()

      expect(buttonEl).toBeInTheDocument()
    })

    it('a sign in link is shown', () => {
      const { linkEl } = renderSignupScreen()

      expect(linkEl).toBeInTheDocument()
    })
  })

  describe('When the form shows up,', () => {
    it('the submit button is disabled', () => {
      const { buttonEl } = renderSignupScreen()

      expect(buttonEl).toBeDisabled()
    })

    it('at least three characters is required to enable the submit button', () => {
      const usernameLength = 3
      const passwordLength = 2

      expect(disableFormButton(usernameLength, passwordLength)).toBeTruthy()
    })
  })
})
