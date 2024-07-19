import { test, expect } from '@playwright/test'

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  })

  test('header appears on home page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(
      page.locator('li').filter({ hasText: 'Contact' })
    ).toBeVisible()
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible()
  })

  test('content section one appearance', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'Image' })).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: 'Unlock Your Financial Potential with PennyWise',
      })
    ).toBeVisible()
    await expect(page.getByText('Welcome to PennyWise, your')).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'Explore PennyWise' })
    ).toBeVisible()
  })

  test('content section two appearance', async ({ page }) => {
    await expect(page.getByText('Features')).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: 'Unlock Your Financial Potential',
        exact: true,
      })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Financial Insights' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'AI Integration' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Budget Analytics' })
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Security' })).toBeVisible()
    await expect(page.getByText('Gain deep financial insights')).toBeVisible()
    await expect(page.getByText('Integrated AI technology into')).toBeVisible()
    await expect(page.getByText('Comprehensive budget')).toBeVisible()
    await expect(page.getByText('PennyWise prioritizes your')).toBeVisible()
  })

  test('footer appearance', async ({ page }) => {
    await expect(page.getByRole('contentinfo')).toContainText('PennyWise')
    await expect(page.getByRole('contentinfo')).toContainText(
      '© 2024 PennyWise™ - By @CheezyDevs'
    )
    await expect(page.getByRole('link', { name: '@CheezyDevs' })).toBeVisible()
  })

  // test('test', async ({ page }) => {
  //   await page.goto('https://pennywiseapp.kinde.com/auth/cx/_:nav&m:register&psid:2e8190a264414d9f952c05145725333a');
  //   await page.getByTestId('login-first-name-field').click();
  //   await page.getByTestId('login-first-name-field').fill('Test');
  //   await page.getByTestId('auth-last-name-field').click();
  //   await page.getByTestId('auth-last-name-field').fill('User');
  //   await page.getByTestId('auth-email-field').click();
  //   await page.getByTestId('auth-email-field').fill('testerpennywise123@gmail.com');
  //   await page.getByTestId('auth-submit-button').click();
  // });
})
